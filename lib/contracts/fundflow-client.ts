'use client';

import { Address, BASE_FEE, Contract, nativeToScVal, rpc, scValToNative, TransactionBuilder, xdr } from '@stellar/stellar-sdk';

import { STELLAR_CONFIG } from '@/lib/stellar/config';
import { getWalletKit } from '@/lib/wallet/stellar-wallets-kit';
import type { Campaign, ContractEvent } from '@/types/fundflow';

const server = new rpc.Server(STELLAR_CONFIG.rpcUrl, { allowHttp: STELLAR_CONFIG.rpcUrl.startsWith('http://') });
const contract = STELLAR_CONFIG.contractId ? new Contract(STELLAR_CONFIG.contractId) : null;

function hasContract() {
  return Boolean(contract && STELLAR_CONFIG.contractId && STELLAR_CONFIG.contractId !== 'CONTRACT_ADDRESS_HERE');
}

function requireContract() {
  if (!hasContract() || !contract) {
    throw new Error('NEXT_PUBLIC_CONTRACT_ID is not configured. Deploy the Soroban contract and update the environment first.');
  }
  return contract;
}

function stroopsToXlm(value: bigint | number | string) {
  return (Number(value) / 10_000_000).toLocaleString(undefined, { maximumFractionDigits: 7 });
}

function mapCampaign(value: unknown): Campaign {
  const campaign = value as {
    id: number;
    creator: string;
    title: string;
    description: string;
    funding_goal: bigint | number | string;
    current_amount: bigint | number | string;
    deadline: bigint | number;
    closed: boolean;
    withdrawn: boolean;
  };

  return {
    id: Number(campaign.id),
    creator: String(campaign.creator),
    title: String(campaign.title),
    description: String(campaign.description),
    fundingGoal: stroopsToXlm(campaign.funding_goal),
    currentAmount: stroopsToXlm(campaign.current_amount),
    deadline: Number(campaign.deadline),
    closed: Boolean(campaign.closed),
    withdrawn: Boolean(campaign.withdrawn)
  };
}

async function readContract(method: string, args: xdr.ScVal[] = []) {
  if (!hasContract()) {
    return null;
  }

  const source = await server.getAccount('GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF');
  const transaction = new TransactionBuilder(source, {
    fee: BASE_FEE,
    networkPassphrase: STELLAR_CONFIG.networkPassphrase
  })
    .addOperation(requireContract().call(method, ...args))
    .setTimeout(60)
    .build();
  const simulation = await server.simulateTransaction(transaction);

  if ('error' in simulation) {
    throw new Error(simulation.error);
  }

  const result = simulation.result?.retval;
  return result ? scValToNative(result) : null;
}

async function invokeContract(publicKey: string, method: string, args: xdr.ScVal[]) {
  const account = await server.getAccount(publicKey);
  const operation = requireContract().call(method, ...args);
  const transaction = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: STELLAR_CONFIG.networkPassphrase
  })
    .addOperation(operation)
    .setTimeout(60)
    .build();

  const prepared = await server.prepareTransaction(transaction);

// TODO: Replace with actual wallet signing implementation.
// Temporary build fix.
console.log("Prepared transaction:", prepared.toXDR());

throw new Error(
  "Transaction signing not yet implemented for @creit.tech/stellar-wallets-kit v2"
);
}

export async function fetchCampaigns(): Promise<Campaign[]> {
  const value = await readContract('get_all_campaigns');
  if (!value) {
    return [];
  }
  return (Array.isArray(value) ? value : []).map(mapCampaign);
}

export async function fetchCampaign(id: number): Promise<Campaign> {
  const value = await readContract('get_campaign', [nativeToScVal(id, { type: 'u32' })]);
  if (!value) {
    throw new Error('Campaign not found.');
  }
  return mapCampaign(value);
}

export async function fetchActivity(): Promise<ContractEvent[]> {
  if (!hasContract()) {
    return [];
  }

  const latestLedger = await server.getLatestLedger();
  const response = await server.getEvents({
    startLedger: Math.max(1, latestLedger.sequence - 20_000),
    filters: [{ type: 'contract', contractIds: [STELLAR_CONFIG.contractId] }],
    limit: 100
  });

  return response.events
    .map((event, index) => {
      const topic = event.topic.map((item) => String(scValToNative(item))).join(':');
      const value = scValToNative(event.value);
      const pair = Array.isArray(value) ? value : [undefined, undefined];
      const type = topic.includes('created') ? 'CampaignCreated' : topic.includes('donated') ? 'DonationMade' : 'FundsWithdrawn';
      return {
        id: `${event.ledger}-${index}`,
        type,
        walletAddress: topic.split(':').at(-1) ?? STELLAR_CONFIG.contractId,
        campaignId: Number(pair[0] ?? value ?? 0),
        amount: pair[1] ? stroopsToXlm(pair[1]) : undefined,
        timestamp: new Date().toISOString()
      } satisfies ContractEvent;
    })
    .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
}

export async function createCampaign(input: { publicKey: string; title: string; description: string; fundingGoal: string; deadline: number }) {
  return invokeContract(input.publicKey, 'create_campaign', [
    new Address(input.publicKey).toScVal(),
    nativeToScVal(input.title, { type: 'string' }),
    nativeToScVal(input.description, { type: 'string' }),
    nativeToScVal(BigInt(Math.round(Number(input.fundingGoal) * 10_000_000)), { type: 'i128' }),
    nativeToScVal(input.deadline, { type: 'u64' })
  ]);
}

export async function donate(input: { publicKey: string; campaignId: number; amount: string }) {
  return invokeContract(input.publicKey, 'donate', [
    new Address(input.publicKey).toScVal(),
    nativeToScVal(input.campaignId, { type: 'u32' }),
    nativeToScVal(BigInt(Math.round(Number(input.amount) * 10_000_000)), { type: 'i128' })
  ]);
}

export async function withdraw(input: { publicKey: string; campaignId: number }) {
  return invokeContract(input.publicKey, 'withdraw', [new Address(input.publicKey).toScVal(), nativeToScVal(input.campaignId, { type: 'u32' })]);
}
