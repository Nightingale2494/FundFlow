import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { Providers } from '@/components/providers';
import '@/styles/globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FundFlow | Stellar Crowdfunding',
  description: 'Decentralized crowdfunding on Stellar Testnet using Soroban smart contracts.'
};

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/wallet', label: 'Wallet' },
  { href: '/campaigns', label: 'Campaigns' },
  { href: '/activity', label: 'Activity' },
  { href: '/transactions', label: 'Transactions' }
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.18),transparent_32rem),radial-gradient(circle_at_top_right,hsl(var(--accent)/0.16),transparent_28rem)]">
            <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
              <div className="container flex h-16 items-center justify-between">
                <Link className="text-lg font-bold tracking-tight" href="/">
                  FundFlow
                </Link>
                <nav className="flex items-center gap-2">
                  {navItems.map((item) => (
                    <Link className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground" href={item.href} key={item.href}>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </header>
            <main className="container py-10">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
