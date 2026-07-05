'use client';

import Link from 'next/link';
import { useCampaigns } from '@/hooks/use-campaigns';

export function CampaignGrid() {
  const { data, isLoading, error } = useCampaigns();
  if (isLoading) return <div className="rounded-2xl border p-6 text-muted-foreground">Loading campaigns…</div>;
  if (error) return <div className="rounded-2xl border border-destructive/40 p-6 text-destructive">Failed to load campaigns.</div>;
  if (!data?.length) return <div className="rounded-2xl border p-6 text-muted-foreground">No campaigns yet. Create the first one.</div>;
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {data.map((campaign) => {
        const progress = Math.min(100, (Number(campaign.currentAmount) / Number(campaign.fundingGoal)) * 100);
        return (
          <Link className="rounded-2xl border bg-card/70 p-5 transition hover:border-primary/60" href={`/campaigns/${campaign.id}`} key={campaign.id}>
            <h2 className="text-xl font-semibold">{campaign.title}</h2>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{campaign.description}</p>
            <div className="mt-5 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${progress}%` }} /></div>
            <div className="mt-3 flex justify-between text-sm"><span>{campaign.currentAmount} XLM</span><span>{campaign.fundingGoal} XLM</span></div>
          </Link>
        );
      })}
    </div>
  );
}
