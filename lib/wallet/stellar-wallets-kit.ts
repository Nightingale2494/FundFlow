'use client';

import { STELLAR_NETWORK } from '@/lib/stellar/config';

type KitInstance = {
  authModal: () => Promise<{ address: string }>;
  setWallet: (walletId: string) => void;
  getAddress: () => Promise<{ address: string }>;
  signTransaction: (
    xdr: string,
    opts: { address: string; networkPassphrase: string }
  ) => Promise<{ signedTxXdr: string; signerAddress: string }>;
};

export async function getWalletKit(): Promise<KitInstance> {
  const sdk = await import('@creit.tech/stellar-wallets-kit/sdk');
  const { defaultModules } = await import('@creit.tech/stellar-wallets-kit/modules/utils');
  const StellarWalletsKit = (sdk as any).StellarWalletsKit;

  if (!initialized) {
    StellarWalletsKit.init({
      modules: defaultModules(),
      network:
        STELLAR_NETWORK === 'PUBLIC'
          ? 'Public Global Stellar Network ; September 2015'
          : 'Test SDF Network ; September 2015',
    } as any);
    initialized = true;
  }

  return {
    authModal: StellarWalletsKit.authModal.bind(StellarWalletsKit),
    setWallet: StellarWalletsKit.setWallet.bind(StellarWalletsKit),
    getAddress: StellarWalletsKit.getAddress.bind(StellarWalletsKit),
    // Add the signTransaction method from StellarWalletsKit
    signTransaction: StellarWalletsKit.signTransaction.bind(StellarWalletsKit),
  };
}
