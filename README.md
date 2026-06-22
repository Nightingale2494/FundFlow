# FundFlow

FundFlow is a decentralized crowdfunding platform for Stellar Testnet using Soroban smart contracts, StellarWalletsKit, Next.js 15, TypeScript, Tailwind CSS, TanStack Query, and Zustand.

## Features

- Multi-wallet connection, disconnection, persisted wallet session, network display, public address display, and native XLM balance lookup.
- Soroban crowdfunding contract with campaign creation, donation, withdrawal, campaign reads, campaign count, full campaign list, authorization checks, duplicate-withdrawal prevention, and state-changing events.
- Frontend pages for home, wallet dashboard, campaign listing, campaign details, campaign creation, activity feed, and transaction history.
- TanStack Query polling every five seconds for campaigns and activity.
- Transaction queue with hash, explorer link, timestamp, pending/success/failed status fields, and persisted Zustand state.

## Architecture

```text
app/                 Next.js App Router pages
components/          UI and feature components
hooks/               React Query mutation/query hooks
lib/stellar/         Stellar network and Horizon helpers
lib/contracts/       Soroban contract client and data mapping
lib/wallet/          StellarWalletsKit adapter and error handling
stores/              Zustand wallet and transaction stores
contracts/           Soroban Rust workspace
scripts/             Build, optimize, deploy, initialize, and env scripts
types/               Shared TypeScript models
```

## Environment Variables

Copy `.env.example` to `.env.local` and update values after deploying the contract.

```bash
NEXT_PUBLIC_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_NETWORK_PASSPHRASE="Test SDF Network ; September 2015"
NEXT_PUBLIC_CONTRACT_ID=CONTRACT_ADDRESS_HERE
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_STELLAR_EXPLORER=https://stellar.expert/explorer/testnet
```

## Install and Run

```bash
npm install
npm run dev
```

## Contract Build and Deployment

Install Rust, the `wasm32-unknown-unknown` target, and Stellar CLI. Then run:

```bash
npm run contract:build
npm run contract:optimize
STELLAR_SOURCE_ACCOUNT=YOUR_STELLAR_CLI_IDENTITY npm run contract:deploy
NEXT_PUBLIC_CONTRACT_ID=CONTRACT_ADDRESS_HERE STELLAR_NATIVE_TOKEN_CONTRACT_ID=NATIVE_TOKEN_CONTRACT_ID STELLAR_SOURCE_ACCOUNT=YOUR_STELLAR_CLI_IDENTITY npm run contract:init
npm run env:update CONTRACT_ADDRESS_HERE
```

Record deployment artifacts:

- Contract ID: `CONTRACT_ADDRESS_HERE`
- Deployment transaction: `TRANSACTION_HASH_HERE`

## Vercel Deployment

1. Create a Vercel project from this repository.
2. Add all `NEXT_PUBLIC_*` variables in Vercel project settings.
3. Deploy with the default Next.js build command: `npm run build`.
4. Confirm wallet connection and campaign reads against Stellar Testnet.

## Git Commit Plan

1. Initialize Next.js scaffold and wallet integration.
2. Add Soroban crowdfunding contract and deployment scripts.
3. Integrate campaign create, donate, withdraw, and read flows.
4. Add transaction tracking, activity feed, and five-second polling.
5. Finalize UI, docs, production cleanup, and deployment verification.
