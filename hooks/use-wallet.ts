'use client';

import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';

import { getNativeBalance } from '@/lib/stellar/horizon';
import { normalizeWalletError } from '@/lib/wallet/errors';
import { getWalletKit } from '@/lib/wallet/stellar-wallets-kit';
import { useWalletStore } from '@/stores/wallet-store';

export function useWallet() {
  const wallet = useWalletStore();

  const refreshBalance = useCallback(
    async (publicKey = wallet.publicKey) => {
      if (!publicKey) {
        return null;
      }

      try {
        const nativeBalance = await getNativeBalance(publicKey);
        useWalletStore.getState().setBalance(nativeBalance);
        return nativeBalance;
      } catch (error) {
        const normalizedError = normalizeWalletError(error);
        useWalletStore.getState().setError(normalizedError.message);
        toast.error(normalizedError.message);
        return null;
      }
    },
    [wallet.publicKey]
  );

  const connect = useCallback(async () => {
    useWalletStore.getState().setConnecting();

    try {
      const kit = await getWalletKit();

      // Opens the Stellar Wallets Kit authentication modal
      const { address } = await kit.authModal();

      // Fetch latest XLM balance
      const nativeBalance = await getNativeBalance(address);

      // Persist session in Zustand
      useWalletStore.getState().setConnected({
        publicKey: address,
        walletId: 'connected-wallet',
        walletName: 'Stellar Wallet',
        nativeBalance,
      });

      toast.success('Wallet connected successfully.');
    } catch (error) {
      const normalizedError = normalizeWalletError(error);

      useWalletStore.getState().setError(normalizedError.message);

      toast.error(normalizedError.message);
    }
  }, []);

  const disconnect = useCallback(() => {
    useWalletStore.getState().disconnect();
    toast.success('Wallet disconnected.');
  }, []);

  useEffect(() => {
    if (wallet.status === 'connected' && wallet.publicKey) {
      void refreshBalance(wallet.publicKey);
    }
  }, [wallet.status, wallet.publicKey, refreshBalance]);

  return {
    ...wallet,
    connect,
    disconnect,
    refreshBalance,
  };
}