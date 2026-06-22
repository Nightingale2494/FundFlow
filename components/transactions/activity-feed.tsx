'use client';

import { useActivity } from '@/hooks/use-campaigns';

export function ActivityFeed() {
  const { data, isLoading } = useActivity();
  if (isLoading) return <div className="rounded-2xl border p-6">Loading activity…</div>;
  if (!data?.length) return <div className="rounded-2xl border p-6 text-muted-foreground">No contract events yet.</div>;
  return <div className="space-y-3">{data.map((event) => <article className="rounded-2xl border bg-card/70 p-4" key={event.id}><div className="font-semibold">{event.type}</div><div className="text-sm text-muted-foreground">Campaign #{event.campaignId} · {event.amount ? `${event.amount} XLM · ` : ''}{new Date(event.timestamp).toLocaleString()}</div><div className="break-all text-xs text-muted-foreground">{event.walletAddress}</div></article>)}</div>;
}
