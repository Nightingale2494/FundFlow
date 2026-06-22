import { Networks } from '@stellar/stellar-sdk';

export const STELLAR_CONFIG = {
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL ?? 'https://soroban-testnet.stellar.org',
  horizonUrl: process.env.NEXT_PUBLIC_HORIZON_URL ?? 'https://horizon-testnet.stellar.org',
  networkPassphrase: process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE ?? Networks.TESTNET,
  explorerUrl: process.env.NEXT_PUBLIC_STELLAR_EXPLORER ?? 'https://stellar.expert/explorer/testnet',
  contractId: process.env.NEXT_PUBLIC_CONTRACT_ID ?? ''
} as const;

export const STELLAR_NETWORK = STELLAR_CONFIG.networkPassphrase === Networks.PUBLIC ? 'PUBLIC' : 'TESTNET';
