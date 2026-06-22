'use client';

import { useState } from 'react';
import { useCreateCampaign } from '@/hooks/use-campaigns';

export function CreateCampaignForm() {
  const mutation = useCreateCampaign();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fundingGoal, setFundingGoal] = useState('1000');
  const [deadline, setDeadline] = useState('');
  return (
    <form className="mx-auto max-w-2xl space-y-4 rounded-3xl border bg-card/70 p-6" onSubmit={(event) => { event.preventDefault(); mutation.mutate({ title, description, fundingGoal, deadline: Math.floor(new Date(deadline).getTime() / 1000) }); }}>
      <h1 className="text-3xl font-bold">Create campaign</h1>
      <input className="w-full rounded-xl border bg-background px-3 py-2" onChange={(event) => setTitle(event.target.value)} placeholder="Title" required value={title} />
      <textarea className="min-h-32 w-full rounded-xl border bg-background px-3 py-2" onChange={(event) => setDescription(event.target.value)} placeholder="Description" required value={description} />
      <input className="w-full rounded-xl border bg-background px-3 py-2" min="1" onChange={(event) => setFundingGoal(event.target.value)} step="0.0000001" type="number" value={fundingGoal} />
      <input className="w-full rounded-xl border bg-background px-3 py-2" onChange={(event) => setDeadline(event.target.value)} required type="datetime-local" value={deadline} />
      <button className="rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground disabled:opacity-60" disabled={mutation.isPending} type="submit">{mutation.isPending ? 'Submitting…' : 'Create campaign'}</button>
    </form>
  );
}
