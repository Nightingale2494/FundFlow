export type WalletErrorCode =
  | 'WALLET_NOT_INSTALLED'
  | 'USER_REJECTED'
  | 'INSUFFICIENT_BALANCE'
  | 'RPC_FAILURE'
  | 'NETWORK_MISMATCH'
  | 'CONNECTION_FAILED';

export class WalletConnectionError extends Error {
  constructor(
    message: string,
    public readonly code: WalletErrorCode
  ) {
    super(message);
    this.name = 'WalletConnectionError';
  }
}

export function normalizeWalletError(error: unknown): WalletConnectionError {
  const message = error instanceof Error ? error.message : String(error);
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('not installed') || lowerMessage.includes('not found')) {
    return new WalletConnectionError('Wallet extension is not installed. Choose another wallet or install the selected wallet.', 'WALLET_NOT_INSTALLED');
  }

  if (lowerMessage.includes('reject') || lowerMessage.includes('decline') || lowerMessage.includes('cancel')) {
    return new WalletConnectionError('Wallet request was rejected. Please approve the request to continue.', 'USER_REJECTED');
  }

  if (lowerMessage.includes('insufficient')) {
    return new WalletConnectionError('Insufficient XLM balance to complete this action.', 'INSUFFICIENT_BALANCE');
  }

  if (lowerMessage.includes('network')) {
    return new WalletConnectionError('Wallet network does not match the FundFlow Stellar Testnet configuration.', 'NETWORK_MISMATCH');
  }

  if (lowerMessage.includes('rpc') || lowerMessage.includes('horizon') || lowerMessage.includes('failed to fetch')) {
    return new WalletConnectionError('Unable to reach Stellar network services. Please try again shortly.', 'RPC_FAILURE');
  }

  return new WalletConnectionError(message || 'Wallet connection failed. Please try again.', 'CONNECTION_FAILED');
}
