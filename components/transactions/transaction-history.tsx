'use client';

import { useTransactionStore } from '@/stores/transaction-store';

export function TransactionHistory() {
  const transactions = useTransactionStore((state) => state.transactions);
  if (!transactions.length) return <div className="rounded-2xl border p-6 text-muted-foreground">No tracked transactions yet.</div>;
  return <div className="space-y-3">{transactions.map((tx) => <a className="block rounded-2xl border bg-card/70 p-4" href={tx.explorerLink} key={tx.hash} rel="noreferrer" target="_blank"><div className="font-semibold">{tx.action} · {tx.status}</div><div className="break-all text-sm text-muted-foreground">{tx.hash}</div><div className="text-xs text-muted-foreground">{new Date(tx.timestamp).toLocaleString()}</div></a>)}</div>;
}
