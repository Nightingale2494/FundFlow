# 🚀 FundFlow

**FundFlow** is a decentralized crowdfunding platform built on the **Stellar Testnet** using **Soroban Smart Contracts**. It enables users to create transparent fundraising campaigns, donate securely using Stellar wallets, and track all on-chain activity in real time.

---

# ✨ Features

- 🔐 Multi-wallet support via Stellar Wallets Kit
- 👛 Connect and disconnect Stellar wallets
- 💰 View wallet address and XLM balance
- 🏗️ Create crowdfunding campaigns
- ❤️ Donate to campaigns using Soroban smart contracts
- 💸 Campaign creator withdrawal flow
- 📡 Real-time activity feed
- 📜 Transaction history with Stellar Explorer links
- ⚡ Automatic transaction status updates
- 🌙 Responsive modern UI with dark mode
- 🔔 Toast notifications and loading states

---

# 🛠 Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- Soroban SDK
- Stellar JavaScript SDK
- Stellar Wallets Kit
- TanStack Query
- Zustand
- Stellar Testnet

---

# 📂 Project Structure

```text
app/
components/
contracts/
hooks/
lib/
public/
scripts/
stores/
styles/
types/
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
NEXT_PUBLIC_CONTRACT_ID=CADSFRGYNXUMZWTWJBCUKG5BAK5MMKB3DSLPV5BJUPGHIBVVC3HSSQCX

NEXT_PUBLIC_RPC_URL=https://soroban-testnet.stellar.org

NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org

NEXT_PUBLIC_NETWORK_PASSPHRASE=Test SDF Network ; September 2015

NEXT_PUBLIC_STELLAR_EXPLORER=https://stellar.expert/explorer/testnet
```

---

# 👛 Wallet Setup

Install a supported Stellar wallet.

Recommended:

- Freighter Wallet

Connect your wallet through the application and approve transactions when prompted.

---

# 📜 Smart Contract

## Contract Address

```
CCIOIG2FN3HWJUCBDZGHADSBOOJ2ZW4RNOK2YQP4FSI2GC2LIHDHHQHX
```

---

## Deployment Transaction

```
daac8ee435c63fce5a862368ac52c4648d75fcf04505a7f5170687c617639220
```

Explorer:

https://stellar.expert/explorer/testnet/tx/daac8ee435c63fce5a862368ac52c4648d75fcf04505a7f5170687c617639220

---

## Initialization Transaction

```
24ed73582176fd4aa118a14f569d5e7fd5be635116c6de0b17117d2d164d91d8
```

Explorer:

https://stellar.expert/explorer/testnet/tx/24ed73582176fd4aa118a14f569d5e7fd5be635116c6de0b17117d2d164d91d8

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

# 📦 Building the Smart Contract

```bash
cd contracts

stellar contract build
```

---

# 🚀 Deploying the Smart Contract

```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/fundflow.wasm \
  --source deployer \
  --network testnet
```

---

# 🧪 Available Pages

- `/`
- `/wallet`
- `/campaigns`
- `/campaigns/create`
- `/campaigns/[id]`
- `/activity`
- `/transactions`

---

# 📸 Screenshots

Create a `screenshots` folder in the project root and add the following images.

### 🏠 Home

```
screenshots/home.png
```

### 👛 Wallet Dashboard

```
screenshots/wallet.png
```

### 🔐 Wallet Selection (Required)

```
screenshots/wallet-options.png
```

### 📢 Campaigns

```
screenshots/campaigns.png
```

### ➕ Create Campaign

```
screenshots/create-campaign.png
```

### 📡 Activity

```
screenshots/activity.png
```

### 📜 Transactions

```
screenshots/transactions.png
```

### 📜 Transaction Proof

```

screenshots/transaction-proof.png

https://stellar.expert/explorer/testnet/tx/0aec928e5fd313a38e1096d55db84c0b0d441456e0aadfc485e22b31ef52d311

```

---

# 🌍 Live Demo

```
https://fund-flow-7tpv.vercel.app/
```

---

# 📋 Git Commit History

Minimum recommended commits:

- Initial project setup
- Wallet integration
- Soroban smart contract deployment
- Frontend integration
- Documentation & UI improvements

---

# 📄 License

MIT

---

Built with ❤️ using **Stellar**, **Soroban**, and **Next.js**.
