import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { Providers } from '@/components/providers';
import '@/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FundFlow | Stellar Crowdfunding',
  description:
    'Decentralized crowdfunding on Stellar Testnet using Soroban smart contracts.',
};

const navItems = [
  { href: '/' as const, label: 'Home' },
  { href: '/wallet' as const, label: 'Wallet' },
  { href: '/campaigns' as const, label: 'Campaigns' },
  { href: '/campaigns/create' as const, label: 'Create Campaign' },
  { href: '/activity' as const, label: 'Activity' },
  { href: '/transactions' as const, label: 'Transactions' }
];

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.18),transparent_32rem),radial-gradient(circle_at_top_right,hsl(var(--accent)/0.16),transparent_28rem)]">
            <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
              <div className="container flex h-16 items-center justify-between">
                <Link
                  href="/"
                  className="text-xl font-bold tracking-tight transition hover:text-primary"
                >
                  FundFlow
                </Link>

                <nav className="flex flex-wrap items-center gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </header>

            <main className="container py-10">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
