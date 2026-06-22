'use client';

import { useState } from 'react';
import { useCampaign, useDonate, useWithdraw } from '@/hooks/use-campaigns';
import { useWalletStore } from '@/stores/wallet-store';

export function CampaignDetail({ id }: { id: number }) {
  const { data: campaign, isLoading } = useCampaign(id);
  const [amount, setAmount] = useState('10');
  const donate = useDonate();
  const withdraw = useWithdraw();
  const publicKey = useWalletStore((state) => state.publicKey);
  if (isLoading) return <div className="rounded-2xl border p-6">Loading campaign…</div>;
  if (!campaign) return <div className="rounded-2xl border p-6">Campaign not found.</div>;
  const progress = Math.min(100, (Number(campaign.currentAmount) / Number(campaign.fundingGoal)) * 100);
  const isCreator = publicKey === campaign.creator;
  return (
    <section className="rounded-3xl border bg-card/70 p-6">
      <h1 className="text-3xl font-bold">{campaign.title}</h1>
      <p className="mt-4 text-muted-foreground">{campaign.description}</p>
      <div className="mt-6 h-3 rounded-full bg-muted"><div className="h-3 rounded-full bg-primary" style={{ width: `${progress}%` }} /></div>
      <div className="mt-4 grid gap-3 md:grid-cols-3"><div>{campaign.currentAmount} XLM raised</div><div>{campaign.fundingGoal} XLM goal</div><div>{new Date(campaign.deadline * 1000).toLocaleString()}</div></div>
      <form className="mt-6 flex gap-3" onSubmit={(event) => { event.preventDefault(); donate.mutate({ campaignId: id, amount }); }}>
        <input className="rounded-xl border bg-background px-3 py-2" min="0.0000001" onChange={(event) => setAmount(event.target.value)} step="0.0000001" type="number" value={amount} />
        <button className="rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground disabled:opacity-60" disabled={donate.isPending} type="submit">{donate.isPending ? 'Submitting…' : 'Donate'}</button>
      </form>
      {isCreator ? <button className="mt-4 rounded-xl border px-4 py-2 disabled:opacity-60" disabled={withdraw.isPending} onClick={() => withdraw.mutate(id)} type="button">{withdraw.isPending ? 'Submitting…' : 'Withdraw funds'}</button> : null}
    </section>
  );
}
