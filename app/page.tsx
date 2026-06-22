import { ArrowRight, BadgeDollarSign, RadioTower, ShieldCheck, Wallet } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: 'Multi-wallet support',
    description: 'Connect through StellarWalletsKit with support for the Stellar ecosystem wallet providers your backers already use.',
    icon: Wallet
  },
  {
    title: 'Soroban-native funding',
    description: 'Campaign creation, donations, withdrawals, and events are designed around direct Soroban contract calls.',
    icon: BadgeDollarSign
  },
  {
    title: 'Live synchronization',
    description: 'Campaign totals, activity, and transaction states refresh automatically so users never need to reload.',
    icon: RadioTower
  },
  {
    title: 'Production guardrails',
    description: 'Wallet errors, network status, balance checks, transaction tracking, and accessible feedback are first-class flows.',
    icon: ShieldCheck
  }
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-3xl border bg-card/80 p-8 shadow-2xl shadow-black/20 backdrop-blur md:p-12">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">Stellar Testnet crowdfunding</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Fund transparent campaigns with Soroban-powered trust.</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            FundFlow helps creators launch crowdfunding campaigns and gives backers real-time visibility into funding progress, wallet state, and contract activity.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90" href="/wallet">
              Connect wallet
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold transition hover:bg-muted" href="https://developers.stellar.org/docs/build/apps/overview" rel="noreferrer" target="_blank">
              Stellar docs
            </a>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <article className="rounded-2xl border bg-card/70 p-6" key={feature.title}>
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold">{feature.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.description}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
