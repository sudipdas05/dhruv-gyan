
"use client";

import { ArrowRight, Flag, Ship } from "lucide-react";
import Link from "next/link";
import { expeditions, timeline } from "@/lib/mock-data";
import { Panel, SectionHead, Badge } from "@/components/ui/card";

export default function ExpeditionsView() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <SectionHead eyebrow="Since 1981" title="Indian Polar Expeditions"
        sub="From the first voyage aboard M/V Trishna to the ongoing 44th mission — a four-decade journey of science, logistics and discovery." />
      <div className="relative mb-16 ml-3 border-l-2 border-cyan-400/30 pl-8">
        {timeline.map((t) => (
          <div key={t.year} className="relative pb-8 last:pb-0">
            <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-cyan-400 bg-polar-950">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </span>
            <p className="text-sm font-bold text-accent">{t.year}</p>
            <h3 className="mt-0.5 font-semibold text-primary">{t.title}</h3>
            <p className="mt-1 max-w-xl text-sm text-muted">{t.text}</p>
          </div>
        ))}
      </div>
      <SectionHead eyebrow="Mission Records" title="Expedition Archive" />
      <div className="grid gap-5 md:grid-cols-2">
        {[...expeditions].reverse().map((e) => (
          <Link key={e.id} href={`/expeditions/${e.id}`} className="group focus-ring rounded-2xl">
            <Panel className="h-full p-5 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-cyan-400/40">
              <div className="flex items-center justify-between">
                <Badge className="text-accent border-cyan-400/30">{e.season}</Badge>
                {e.ongoing && <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300"><span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-emerald-400" />Ongoing</span>}
              </div>
              <h3 className="mt-3 flex items-center gap-2 font-semibold text-primary">
                <Ship className="h-4 w-4 text-accent" /> {e.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">{e.description}</p>
              <p className="mt-3 flex items-center gap-2 text-xs text-muted">
                <Flag className="h-3.5 w-3.5 text-accent" /> Leader: {e.leader} · {e.teamSize} members
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                Open mission record <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Panel>
          </Link>
        ))}
      </div>
    </div>
  );
}
