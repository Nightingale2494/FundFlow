import Link from 'next/link';
import { CampaignGrid } from '@/components/campaigns/campaign-grid';

export default function CampaignsPage() {
  return <div className="space-y-6"><div className="flex items-center justify-between"><h1 className="text-3xl font-bold">Campaigns</h1><Link className="rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground" href="/campaigns/create">Create Campaign</Link></div><CampaignGrid /></div>;
}
