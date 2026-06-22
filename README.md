# 🚀 FundFlow

**FundFlow** is a decentralized crowdfunding platform built on the **Stellar Testnet** using **Soroban Smart Contracts**. It enables users to create transparent fundraising campaigns, donate securely using Stellar wallets, and track all on-chain activity in real time.

---

# ✨ Features

* 🔐 Multi-wallet support via Stellar Wallets Kit
* 👛 Connect and disconnect Stellar wallets
* 💰 View wallet address and XLM balance
* 🏗️ Create crowdfunding campaigns
* ❤️ Donate to campaigns using Soroban smart contracts
* 💸 Campaign creator withdrawal flow
* 📡 Real-time activity feed
* 📜 Transaction history with explorer links
* ⚡ Automatic transaction status updates
* 🌙 Responsive modern UI with dark mode
* 🔔 Toast notifications and loading states

---

# 🛠 Tech Stack

* Next.js 15
* TypeScript
* Tailwind CSS
* shadcn/ui
* Soroban SDK
* Stellar JavaScript SDK
* Stellar Wallets Kit
* TanStack Query
* Zustand
* Stellar Testnet

---

# 📂 Project Structure

```
app/
components/
hooks/
lib/
contracts/
scripts/
stores/
styles/
types/
public/
```

---

# ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/Nightingale2494/FundFlow.git
cd FundFlow
```

Install dependencies:

```bash
npm install --ignore-scripts
```

Run the development server:

```bash
npm run dev
```

---

# 🌐 Environment Variables

Create a `.env.local` file.

```env
NEXT_PUBLIC_CONTRACT_ID=CDBK42IVV4NTXA3D4ITDD75AZI5KGBICUS4QBSA3FYBWRUOTJMXOFTTZ

NEXT_PUBLIC_RPC_URL=https://soroban-testnet.stellar.org

NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org

NEXT_PUBLIC_NETWORK_PASSPHRASE=Test SDF Network ; September 2015

NEXT_PUBLIC_STELLAR_EXPLORER=https://stellar.expert/explorer/testnet
```

---

# 👛 Wallet Setup

Install any supported Stellar wallet.

Recommended:

* Freighter Wallet

Connect the wallet through the application dashboard and approve transactions when prompted.

---

# 📜 Smart Contract

## Contract Address

```
CDBK42IVV4NTXA3D4ITDD75AZI5KGBICUS4QBSA3FYBWRUOTJMXOFTTZ
```

---

## Deployment Transaction

```
303d75cbf4dea93f7c0d5b6de587e4c1ed337c17441872dabb843608603fae11
```

Explorer:

https://stellar.expert/explorer/testnet/tx/303d75cbf4dea93f7c0d5b6de587e4c1ed337c17441872dabb843608603fae11

---

## Initialization Transaction

```
1fc363ffcc855cd9519d188feb2749da3315011c50f3326f064e61c4e762f3fd
```

Explorer:

https://stellar.expert/explorer/testnet/tx/1fc363ffcc855cd9519d188feb2749da3315011c50f3326f064e61c4e762f3fd

---

# 🚀 Running Locally

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# 📦 Contract Build

```bash
cd contracts

stellar contract build
```

---

# 🚀 Contract Deployment

```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/fundflow.wasm \
  --source deployer \
  --network testnet
```

---

# 🧪 Available Pages

* `/`
* `/wallet`
* `/campaigns`
* `/campaigns/create`
* `/campaigns/[id]`
* `/activity`
* `/transactions`

---

# 📸 Screenshot

Include a screenshot showing the wallet selection modal with supported Stellar wallets before submission.

---

# 🌍 Live Demo

Deploy on Vercel:

```
https://your-project.vercel.app
```

(Add deployed URL after hosting.)

---

# 📋 Git Commit Plan

### Commit 1

Project initialization and wallet integration.

### Commit 2

Smart contract deployment and frontend integration.

### Commit 3

Real-time events and transaction tracking.

### Commit 4

UI polish and documentation.

---

# 📄 License

MIT

---

Built with ❤️ using Stellar and Soroban.
