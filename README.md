# FundFlow

FundFlow is a decentralized crowdfunding platform planned for the Stellar Testnet with Soroban smart contracts, Next.js 15, TypeScript, Tailwind CSS, StellarWalletsKit, TanStack Query, and Zustand.

## Initial Scaffold

This repository currently contains the base project configuration and the canonical folder structure for the application. Implementation files will be added incrementally as the smart contract, wallet integration, frontend pages, transaction tracking, and real-time event feed are built.

## Folder Structure

```text
app/                 Next.js App Router pages and layouts
components/          Reusable React components
components/ui/       shadcn/ui-compatible primitives
hooks/               Reusable React and TanStack Query hooks
lib/                 Framework-neutral application services
lib/stellar/         Stellar network, RPC, Horizon, and explorer utilities
lib/contracts/       Typed Soroban contract client helpers
lib/wallet/          StellarWalletsKit setup and wallet helpers
contracts/           Soroban crowdfunding smart contract source
scripts/             Contract build, deployment, initialization, and env scripts
public/              Static assets served by Next.js
styles/              Global styles and Tailwind CSS entrypoints
types/               Shared TypeScript application types
```

## Configuration Files

- `package.json` defines application, quality, and contract workflow scripts.
- `tsconfig.json` enables strict TypeScript with Next.js App Router support and `@/*` path aliases.
- `next.config.ts` configures Next.js runtime behavior and image host allowlisting.
- `tailwind.config.ts` configures Tailwind CSS, dark mode, shadcn/ui-compatible tokens, and animation utilities.
- `postcss.config.mjs` wires Tailwind CSS and Autoprefixer into the CSS pipeline.

## Development

Install dependencies and run the local development server:

```bash
npm install
npm run dev
```

Run static checks:

```bash
npm run typecheck
npm run lint
```

## Contract Workflow Scripts

The scaffold reserves npm scripts for Soroban workflows that will be implemented in `scripts/`:

```bash
npm run contract:build
npm run contract:optimize
npm run contract:deploy
npm run contract:init
npm run env:update
```
