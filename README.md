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
CADSFRGYNXUMZWTWJBCUKG5BAK5MMKB3DSLPV5BJUPGHIBVVC3HSSQCX
```

---

## Deployment Transaction

```
33b232febe9b63a81a5e86cf85c96420274a480b4be9ed13c36972d6a613f73c
```

Explorer:

https://stellar.expert/explorer/testnet/tx/33b232febe9b63a81a5e86cf85c96420274a480b4be9ed13c36972d6a613f73c

---

## Initialization Transaction

```
b728f5a4f4eb69d77f39cd177de2c9c5d809177aba1fccc522b6f97f117d5c29
```

Explorer:

https://stellar.expert/explorer/testnet/tx/b728f5a4f4eb69d77f39cd177de2c9c5d809177aba1fccc522b6f97f117d5c29

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
<img width="1917" height="967" alt="image" src="https://github.com/user-attachments/assets/991f8c0d-1918-4e33-93c4-85c358e8540e" />

```

### 👛 Wallet Dashboard

```
<img width="1917" height="967" alt="image" src="https://github.com/user-attachments/assets/48dde792-8468-4da2-9680-e50c4b193bfc" />

```

### 🔐 Wallet Selection (Required)

```
<img width="1917" height="962" alt="image" src="https://github.com/user-attachments/assets/7a4801bd-e304-413b-b681-bcd8bf238b34" />

```

### 📢 Campaigns

```
<img width="1917" height="910" alt="image" src="https://github.com/user-attachments/assets/52f7935d-5105-41dd-ad73-6854a9313135" />

```

### ➕ Create Campaign

```
<img width="1917" height="970" alt="image" src="https://github.com/user-attachments/assets/eb2da994-a766-4aef-ae71-469c8a23e890" />

```

### 📡 Activity

```
<img width="1917" height="967" alt="image" src="https://github.com/user-attachments/assets/1b4afe53-dfa8-4b86-ae3e-6f65d74811a7" />

```

### 📜 Transactions

```
<img width="1917" height="962" alt="image" src="https://github.com/user-attachments/assets/0ce3baf2-31d0-45e8-a411-994ae8c26d41" />

```

### 📜 Transaction Proof

```

<img width="1917" height="975" alt="image" src="https://github.com/user-attachments/assets/2a4413ee-8c5d-43a0-8337-131a9de44ac1" />

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
