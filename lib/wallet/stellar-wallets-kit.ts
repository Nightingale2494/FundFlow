'use client';

import { STELLAR_NETWORK } from '@/lib/stellar/config';

type KitInstance = {
  authModal: () => Promise<{ address: string }>;
  setWallet: (walletId: string) => void;
  getAddress: () => Promise<{ address: string }>;
};

let initialized = false;

export async function getWalletKit(): Promise<KitInstance> {
  const { StellarWalletsKit, Networks } = await import(
    '@creit.tech/stellar-wallets-kit/sdk'
  );

  const { defaultModules } = await import(
    '@creit.tech/stellar-wallets-kit/modules/utils'
  );

  if (!initialized) {
    StellarWalletsKit.init({
      modules: defaultModules(),
      network:
        STELLAR_NETWORK === 'PUBLIC'
          ? Networks.PUBLIC
          : Networks.TESTNET,
    });

    initialized = true;
  }

  return {
    authModal: StellarWalletsKit.authModal.bind(StellarWalletsKit),
    setWallet: StellarWalletsKit.setWallet.bind(StellarWalletsKit),
    getAddress: StellarWalletsKit.getAddress.bind(StellarWalletsKit),
  };
}
