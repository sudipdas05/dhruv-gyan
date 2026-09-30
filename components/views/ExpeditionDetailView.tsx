
"use client";

import { ArrowLeft, Bot, FileText, MapPin, Target, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { expeditions, resources } from "@/lib/mock-data";
import { Panel, Badge } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { EmptyState } from "@/components/ui/misc";

export default function ExpeditionDetailView({ id }: { id: string }) {
  const router = useRouter();
  const e = expeditions.find((x) => x.id === id);
  if (!e) return <EmptyState title="Expedition not found" action={<Link href="/expeditions"><Button variant="outline">All expeditions</Button></Link>} />;
  const reports = e.reports.map((r) => resources.find((x) => x.id === r)).filter(Boolean) as typeof resources;
  const pubs = e.publications.map((r) => resources.find((x) => x.id === r)).filter(Boolean) as typeof resources;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      <Link href="/expeditions" className="flex items-center gap-1.5 text-sm text-muted hover:text-accent focus-ring rounded"><ArrowLeft className="h-4 w-4" /> All expeditions</Link>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge className="text-accent border-cyan-400/30">{e.season}</Badge>
        <Badge>{e.region}</Badge>
        {e.ongoing && <Badge className="text-emerald-300 border-emerald-400/40">Ongoing</Badge>}
      </div>
      <h1 className="mt-3 text-3xl font-bold text-primary">{e.name}</h1>
      <p className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted">
        <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-accent" /> {e.station}</span>
        <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-accent" /> {e.teamSize} members · Leader: {e.leader}</span>
      </p>
      <Panel className="mt-6 p-6">
        <p className="leading-relaxed text-muted">{e.description}</p>
      </Panel>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Panel className="p-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent"><Target className="h-4 w-4" /> Mission objectives</h2>
          <ul className="mt-3 space-y-2.5">
            {e.objectives.map((o) => (
              <li key={o} className="flex gap-2.5 text-sm text-muted"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />{o}</li>
            ))}
          </ul>
        </Panel>
        <Panel className="p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">Research areas</h2>
          <div className="mt-3 flex flex-wrap gap-1.5">{e.researchAreas.map((a) => <Badge key={a}>{a}</Badge>)}</div>
          <Button variant="soft" className="mt-5" onClick={() => router.push(`/ai`)}>
            <Bot className="h-4 w-4" /> Ask POLAR AI about this expedition
          </Button>
        </Panel>
      </div>
      {reports.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold text-primary">Mission reports</h2>
          <ul className="space-y-3">
            {reports.map((r) => (
              <li key={r.id}>
                <Link href={`/repository/${r.id}`} className="focus-ring rounded-xl">
                  <Panel className="flex items-center gap-3 p-4 transition-colors hover:border-cyan-400/40">
                    <FileText className="h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm font-medium text-primary">{r.title}</span>
                  </Panel>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {pubs.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold text-primary">Publications from this mission</h2>
          <ul className="space-y-3">
            {pubs.map((r) => (
              <li key={r.id}>
                <Link href={`/repository/${r.id}`} className="focus-ring rounded-xl">
                  <Panel className="p-4 transition-colors hover:border-cyan-400/40">
                    <p className="text-sm font-medium text-primary">{r.title}</p>
                    <p className="mt-1 text-xs text-muted">{r.authors.join(", ")} · {r.year}</p>
                  </Panel>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
