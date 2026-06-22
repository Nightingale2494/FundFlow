import { TransactionHistory } from '@/components/transactions/transaction-history';

export default function TransactionsPage() {
  return <div className="space-y-6"><h1 className="text-3xl font-bold">Transaction History</h1><TransactionHistory /></div>;
}
