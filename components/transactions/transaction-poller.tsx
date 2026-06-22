'use client';

import { rpc } from '@stellar/stellar-sdk';
import { useEffect } from 'react';

import { STELLAR_CONFIG } from '@/lib/stellar/config';
import { useTransactionStore } from '@/stores/transaction-store';

const server = new rpc.Server(STELLAR_CONFIG.rpcUrl, { allowHttp: STELLAR_CONFIG.rpcUrl.startsWith('http://') });

export function TransactionPoller() {
  const pendingTransactions = useTransactionStore((state) => state.transactions.filter((transaction) => transaction.status === 'pending'));
  const updateTransaction = useTransactionStore((state) => state.updateTransaction);

  useEffect(() => {
    if (!pendingTransactions.length) {
      return;
    }

    let cancelled = false;

    async function refreshStatuses() {
      await Promise.all(
        pendingTransactions.map(async (transaction) => {
          try {
            const response = await server.getTransaction(transaction.hash);
            if (cancelled) {
              return;
            }
            if (response.status === 'SUCCESS') {
              updateTransaction(transaction.hash, 'success');
            }
            if (response.status === 'FAILED') {
              updateTransaction(transaction.hash, 'failed');
            }
          } catch {
            if (!cancelled) {
              updateTransaction(transaction.hash, 'failed');
            }
          }
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
