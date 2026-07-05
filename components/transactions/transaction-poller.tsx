'use client';

import { rpc } from '@stellar/stellar-sdk';
import { useEffect, useMemo } from 'react';

import { STELLAR_CONFIG } from '@/lib/stellar/config';
import { useTransactionStore } from '@/stores/transaction-store';

const server = new rpc.Server(STELLAR_CONFIG.rpcUrl, { allowHttp: STELLAR_CONFIG.rpcUrl.startsWith('http://') });

export function TransactionPoller() {
  const transactions = useTransactionStore((state) => state.transactions);
  const pendingTransactions = useMemo(
    () => transactions.filter((transaction) => transaction.status === 'pending'),
    [transactions]
  );
  const updateTransaction = useTransactionStore((state) => state.updateTransaction);

  async function resolveStatus(hash: string) {
    try {
      const response = await server.getTransaction(hash);
      const status = String(response.status).toUpperCase();
      if (status.includes('SUCCESS')) {
        return 'success' as const;
      }
      if (status.includes('FAIL')) {
        return 'failed' as const;
      }
    } catch {
      // Ignore RPC lookup failures here; Horizon can still have the finalized transaction.
    }

    try {
      const response = await fetch(`${STELLAR_CONFIG.horizonUrl}/transactions/${hash}`);
      if (response.ok) {
        return 'success' as const;
      }
      if (response.status === 404) {
        return null;
      }
    } catch {
      // Keep the transaction pending until the next poll when the network is temporarily unavailable.
    }

    return null;
  }

  useEffect(() => {
    if (!pendingTransactions.length) {
      return;
    }

    let cancelled = false;

    async function refreshStatuses() {
      await Promise.all(
        pendingTransactions.map(async (transaction) => {
          const resolvedStatus = await resolveStatus(transaction.hash);
          if (cancelled || !resolvedStatus) {
            return;
          }
          updateTransaction(transaction.hash, resolvedStatus);
        })
      );
    }

    void refreshStatuses();
    const interval = window.setInterval(() => void refreshStatuses(), 5_000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [pendingTransactions, updateTransaction]);

  return null;
}
