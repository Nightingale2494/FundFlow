'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { STELLAR_CONFIG, STELLAR_NETWORK } from '@/lib/stellar/config';

export type WalletStatus = 'idle' | 'connecting' | 'connected' | 'error';

export type WalletState = {
  publicKey: string | null;
  walletId: string | null;
  walletName: string | null;
  network: string;
  networkPassphrase: string;
  nativeBalance: string | null;
  status: WalletStatus;
  error: string | null;
  lastConnectedAt: string | null;
  setConnecting: () => void;
  setConnected: (payload: { publicKey: string; walletId: string; walletName: string; nativeBalance: string | null }) => void;
  setBalance: (nativeBalance: string | null) => void;
  setError: (error: string) => void;
  disconnect: () => void;
};

const initialSession = {
  publicKey: null,
  walletId: null,
  walletName: null,
  nativeBalance: null,
  status: 'idle' as WalletStatus,
  error: null,
  lastConnectedAt: null
};

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      ...initialSession,
      network: STELLAR_NETWORK,
      networkPassphrase: STELLAR_CONFIG.networkPassphrase,
      setConnecting: () => set({ status: 'connecting', error: null }),
      setConnected: ({ publicKey, walletId, walletName, nativeBalance }) =>
        set({
          publicKey,
          walletId,
          walletName,
          nativeBalance,
          status: 'connected',
          error: null,
          lastConnectedAt: new Date().toISOString()
        }),
      setBalance: (nativeBalance) => set({ nativeBalance }),
      setError: (error) => set({ status: 'error', error }),
      disconnect: () => set({ ...initialSession, network: STELLAR_NETWORK, networkPassphrase: STELLAR_CONFIG.networkPassphrase })
    }),
    {
      name: 'fundflow-wallet-session',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ publicKey, walletId, walletName, nativeBalance, status, lastConnectedAt, network, networkPassphrase }) => ({
        publicKey,
        walletId,
        walletName,
        nativeBalance,
        status: status === 'connected' ? status : 'idle',
        lastConnectedAt,
        network,
        networkPassphrase
      })
    }
  )
);
