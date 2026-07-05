# Rise Level 2 Audit

This checklist maps FundFlow against the requested Rise Level 2 requirements after the current implementation pass.

## Wallet Integration

- [x] Multi-wallet support through StellarWalletsKit.
- [x] Wallet selection modal.
- [x] Connect wallet flow.
- [x] Disconnect wallet flow.
- [x] Persist connected wallet session with Zustand.
- [x] Display public address.
- [x] Display Stellar network and network passphrase.
- [x] Display native XLM balance from Horizon.
- [x] User-friendly handling for missing wallet, rejected wallet requests, insufficient balance, RPC/Horizon failure, network mismatch, and failed connection.
- [x] Toast notifications for wallet actions and errors.

## Soroban Smart Contract

- [x] Production Rust Soroban contract under `contracts/fundflow`.
- [x] `Campaign` struct with id, creator, title, description, funding goal, current amount, deadline, closed, and withdrawn fields.
- [x] `create_campaign` implementation.
- [x] `donate` implementation.
- [x] `withdraw` implementation.
- [x] `get_campaign` implementation.
- [x] `get_campaign_count` implementation.
- [x] `get_all_campaigns` implementation.
- [x] Only campaign creator may withdraw.
- [x] Withdrawal requires deadline passed or funding goal reached.
- [x] Donations are blocked after closure, withdrawal, or expired deadline.
- [x] Duplicate withdrawals are prevented.
- [x] `CampaignCreated`, `DonationMade`, and `FundsWithdrawn` events are emitted for state-changing actions.

## Frontend Integration

- [x] Frontend calls Soroban contract methods through a dedicated contract client isolated in `lib/contracts`.
- [x] Fetch campaign list.
- [x] Fetch campaign detail.
- [x] Fetch funding totals.
- [x] Create campaign mutation.
- [x] Donate mutation.
- [x] Withdraw mutation.
- [x] Loading states for reads and mutations.
- [x] Success states through toast notifications and transaction history.
- [x] Error states through visible messages and toast notifications.
- [x] TanStack Query cache invalidation after mutations.

## Transaction Tracking

- [x] Pending status is recorded immediately after transaction submission.
- [x] Success status is polled from Soroban RPC transaction status.
- [x] Failed status is polled or recorded on RPC lookup failure.
- [x] Transaction hash is stored and displayed.
- [x] Explorer link is generated and displayed.
- [x] Timestamp is stored and displayed.
- [x] Status refreshes automatically every five seconds for pending transactions.

## Real-Time Updates

- [x] Campaign list refetches every five seconds.
- [x] Campaign details and totals refetch every five seconds.
- [x] Activity feed refetches every five seconds.
- [x] Pending transaction history refreshes every five seconds.
- [x] Query invalidation updates data after create, donate, and withdraw mutations.

## Event Feed

- [x] Contract events are loaded from Soroban RPC.
- [x] Event type is displayed.
- [x] Wallet address is displayed.
- [x] Campaign id is displayed.
- [x] Amount is displayed when applicable.
- [x] Timestamp is displayed.
- [x] Events are sorted newest first.

## Pages and UI

- [x] Home page.
- [x] Wallet dashboard.
- [x] Campaign listing.
- [x] Campaign details.
- [x] Create campaign.
- [x] Activity feed.
- [x] Transaction history.
- [x] Responsive Tailwind layout.
- [x] Dark mode provider and theme tokens.
- [x] Toast notifications.
- [x] Loading states and empty states.
- [x] Accessible labels are present on interactive form controls.

## State Management

- [x] Zustand wallet state.
- [x] Zustand current account state.
- [x] Zustand transaction queue.
- [x] Theme preference support through `next-themes`.

## Deployment and Documentation

- [x] `.env.example` provided.
- [x] Contract build script.
- [x] Contract optimization script.
- [x] Contract deploy script.
- [x] Contract initialize script.
- [x] Environment update script.
- [x] npm scripts for contract workflows.
- [x] README with overview, features, architecture, environment variables, deployment flow, Vercel notes, testing notes, and commit plan.

## Known Environment Limitation

- Dependency installation and full checks could not be completed in this container because npm and crates.io requests return HTTP 403 from the execution environment. The repository includes the required scripts and configuration so the checks can be run in an unrestricted development environment.
