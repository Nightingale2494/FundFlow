'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import * as fundflow from '@/lib/contracts/fundflow-client';
import { useTransactionStore } from '@/stores/transaction-store';
import { useWalletStore } from '@/stores/wallet-store';

export function useCampaigns() {
  return useQuery({ queryKey: ['campaigns'], queryFn: fundflow.fetchCampaigns, refetchInterval: 5_000 });
}

export function useCampaign(id: number) {
  return useQuery({ queryKey: ['campaign', id], queryFn: () => fundflow.fetchCampaign(id), refetchInterval: 5_000 });
}

export function useActivity() {
  return useQuery({ queryKey: ['activity'], queryFn: fundflow.fetchActivity, refetchInterval: 5_000 });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();
  const publicKey = useWalletStore((state) => state.publicKey);
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  return useMutation({
    mutationFn: async (input: { title: string; description: string; fundingGoal: string; deadline: number }) => {
      if (!publicKey) throw new Error('Connect a wallet before creating a campaign.');
      const hash = await fundflow.createCampaign({ publicKey, ...input });
      addTransaction({ hash, action: 'create_campaign', status: 'pending' });
      return hash;
    },
    onSuccess: async () => {
      toast.success('Campaign transaction submitted.');
      await queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      await queryClient.invalidateQueries({ queryKey: ['activity'] });
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : 'Failed to create campaign.')
  });
}

export function useDonate() {
  const queryClient = useQueryClient();
  const publicKey = useWalletStore((state) => state.publicKey);
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  return useMutation({
    mutationFn: async (input: { campaignId: number; amount: string }) => {
      if (!publicKey) throw new Error('Connect a wallet before donating.');
      const hash = await fundflow.donate({ publicKey, ...input });
      addTransaction({ hash, action: 'donate', status: 'pending' });
      return hash;
    },
    onSuccess: async () => {
      toast.success('Donation transaction submitted.');
      await queryClient.invalidateQueries();
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : 'Donation failed.')
  });
}

export function useWithdraw() {
  const queryClient = useQueryClient();
  const publicKey = useWalletStore((state) => state.publicKey);
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  return useMutation({
    mutationFn: async (campaignId: number) => {
      if (!publicKey) throw new Error('Connect a wallet before withdrawing.');
      const hash = await fundflow.withdraw({ publicKey, campaignId });
      addTransaction({ hash, action: 'withdraw', status: 'pending' });
      return hash;
    },
    onSuccess: async () => {
      toast.success('Withdrawal transaction submitted.');
      await queryClient.invalidateQueries();
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : 'Withdrawal failed.')
  });
}
