export type Campaign = {
  id: number;
  creator: string;
  title: string;
  description: string;
  fundingGoal: string;
  currentAmount: string;
  deadline: number;
  closed: boolean;
  withdrawn: boolean;
};

export type ContractEventType = 'CampaignCreated' | 'DonationMade' | 'FundsWithdrawn';

export type ContractEvent = {
  id: string;
  type: ContractEventType;
  walletAddress: string;
  campaignId: number;
  amount?: string;
  timestamp: string;
};

export type TransactionStatus = 'pending' | 'success' | 'failed';

export type TrackedTransaction = {
  hash: string;
  status: TransactionStatus;
  timestamp: string;
  explorerLink: string;
  action: 'create_campaign' | 'donate' | 'withdraw';
};
