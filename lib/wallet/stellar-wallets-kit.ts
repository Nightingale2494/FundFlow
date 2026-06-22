'use client';

import { STELLAR_NETWORK } from '@/lib/stellar/config';

type KitInstance = {
  openModal: (options: { onWalletSelected: (option: { id: string; name?: string }) => void | Promise<void> }) => Promise<void> | void;
  setWallet: (walletId: string) => void;
  getAddress: () => Promise<{ address: string }>;
  signTransaction: (xdr: string, options: { networkPassphrase: string }) => Promise<{ signedTxXdr: string }>;
};

let kitPromise: Promise<KitInstance> | null = null;

export function getWalletKit(): Promise<KitInstance> {
  kitPromise ??= createWalletKit();
  return kitPromise;
}

async function createWalletKit(): Promise<KitInstance> {
  const walletKitModule = await import('@creit.tech/stellar-wallets-kit');
  const { StellarWalletsKit, WalletNetwork, allowAllModules, FREIGHTER_ID } = walletKitModule as typeof walletKitModule & {
    StellarWalletsKit: new (options: unknown) => KitInstance;
    WalletNetwork: { TESTNET: string; PUBLIC: string };
    allowAllModules: () => unknown[];
    FREIGHTER_ID: string;
  };

  return new StellarWalletsKit({
    network: STELLAR_NETWORK === 'PUBLIC' ? WalletNetwork.PUBLIC : WalletNetwork.TESTNET,
    selectedWalletId: FREIGHTER_ID,
    modules: allowAllModules()
  });
}
