import { Horizon } from '@stellar/stellar-sdk';

import { STELLAR_CONFIG } from '@/lib/stellar/config';

const server = new Horizon.Server(STELLAR_CONFIG.horizonUrl, { allowHttp: STELLAR_CONFIG.horizonUrl.startsWith('http://') });

export async function getNativeBalance(publicKey: string): Promise<string> {
  const account = await server.loadAccount(publicKey);
  const nativeBalance = account.balances.find((balance) => balance.asset_type === 'native');

  if (!nativeBalance) {
    return '0.0000000';
  }

  return Number(nativeBalance.balance).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 7
  });
}
