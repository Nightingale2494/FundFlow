'use client';

import { CheckCircle2, Copy, Loader2, LogOut, RefreshCw, ShieldAlert, Wallet } from 'lucide-react';
import { toast } from 'sonner';

import { useWallet } from '@/hooks/use-wallet';

function shortenAddress(address: string) {
  return `${address.slice(0, 8)}…${address.slice(-8)}`;
}

export function WalletDashboard() {
  const wallet = useWallet();
  const isConnected = wallet.status === 'connected' && wallet.publicKey;
  const isConnecting = wallet.status === 'connecting';

  const copyAddress = async () => {
    if (!wallet.publicKey) {
      return;
    }

    await navigator.clipboard.writeText(wallet.publicKey);
    toast.success('Address copied to clipboard.');
  };

  return (
    <section className="rounded-3xl border bg-card/80 p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary">
            <Wallet className="h-4 w-4" />
            StellarWalletsKit Integration
          </div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Wallet Dashboard</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Connect a Stellar Testnet wallet, persist your session, inspect network information, and monitor your native XLM balance before creating or backing campaigns.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {isConnected ? (
            <button
              className="inline-flex items-center gap-2 rounded-xl border border-destructive/40 px-4 py-2 text-sm font-medium text-destructive transition hover:bg-destructive/10"
              onClick={wallet.disconnect}
              type="button"
            >
              <LogOut className="h-4 w-4" />
              Disconnect
            </button>
          ) : (
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isConnecting}
              onClick={wallet.connect}
              type="button"
            >
              {isConnecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wallet className="h-4 w-4" />}
              {isConnecting ? 'Opening wallet modal…' : 'Connect Wallet'}
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border bg-background/60 p-4">
          <p className="text-sm text-muted-foreground">Connection</p>
          <div className="mt-3 flex items-center gap-2 text-lg font-semibold capitalize">
            {isConnected ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <ShieldAlert className="h-5 w-5 text-muted-foreground" />}
            {wallet.status}
          </div>
        </div>

        <div className="rounded-2xl border bg-background/60 p-4">
          <p className="text-sm text-muted-foreground">Network</p>
          <p className="mt-3 text-lg font-semibold">{wallet.network}</p>
          <p className="mt-1 truncate text-xs text-muted-foreground">{wallet.networkPassphrase}</p>
        </div>

        <div className="rounded-2xl border bg-background/60 p-4">
          <p className="text-sm text-muted-foreground">Native XLM Balance</p>
          <div className="mt-3 flex items-center gap-2">
            <p className="text-lg font-semibold">{wallet.nativeBalance ?? '—'} XLM</p>
            {isConnected ? (
              <button className="rounded-lg p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground" onClick={() => void wallet.refreshBalance()} type="button">
                <RefreshCw className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl border bg-background/60 p-4">
          <p className="text-sm text-muted-foreground">Selected Wallet</p>
          <p className="mt-3 text-lg font-semibold">{wallet.walletName ?? 'Not connected'}</p>
          <p className="mt-1 text-xs text-muted-foreground">{wallet.lastConnectedAt ? new Date(wallet.lastConnectedAt).toLocaleString() : 'No session yet'}</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border bg-background/60 p-4">
        <p className="text-sm text-muted-foreground">Public Address</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <code className="break-all rounded-xl bg-muted px-3 py-2 text-sm">{wallet.publicKey ? shortenAddress(wallet.publicKey) : 'Connect a wallet to display your public address.'}</code>
          {wallet.publicKey ? (
            <button className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition hover:bg-muted" onClick={() => void copyAddress()} type="button">
              <Copy className="h-4 w-4" />
              Copy
            </button>
          ) : null}
        </div>
      </div>

      {wallet.error ? <div className="mt-4 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{wallet.error}</div> : null}
    </section>
  );
}
