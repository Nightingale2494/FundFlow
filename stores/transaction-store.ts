'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { STELLAR_CONFIG } from '@/lib/stellar/config';
import type { TrackedTransaction, TransactionStatus } from '@/types/fundflow';

export type TransactionStore = {
  transactions: TrackedTransaction[];
  addTransaction: (transaction: Omit<TrackedTransaction, 'timestamp' | 'explorerLink'>) => void;
  updateTransaction: (hash: string, status: TransactionStatus) => void;
  clearTransactions: () => void;
};

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      transactions: [],
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            {
              ...transaction,
              timestamp: new Date().toISOString(),
              explorerLink: `${STELLAR_CONFIG.explorerUrl}/tx/${transaction.hash}`
            },
            ...state.transactions.filter((item) => item.hash !== transaction.hash)
          ].slice(0, 25)
        })),
      updateTransaction: (hash, status) =>
        set((state) => ({
          transactions: state.transactions.map((transaction) => (transaction.hash === hash ? { ...transaction, status } : transaction))
        })),
      clearTransactions: () => set({ transactions: [] })
    }),
    {
      name: 'fundflow-transactions',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
