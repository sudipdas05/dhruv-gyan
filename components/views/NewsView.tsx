
"use client";

import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { newsItems } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Panel, SectionHead, Badge } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EmptyState, GradientThumb } from "@/components/ui/misc";

const CATS = ["All", "Expedition Updates", "Research", "Institutional News", "Events", "Announcements", "Education"];

export default function NewsView() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const filtered = useMemo(() => newsItems.filter((n) =>
    (cat === "All" || n.category === cat) &&
    (!q || (n.title + n.excerpt).toLowerCase().includes(q.toLowerCase()))), [cat, q]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <SectionHead eyebrow="Institutional" title="News & Activities"
        sub="Expedition updates, research highlights, events and announcements from the Indian polar programme." />
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={cn("rounded-full border px-3 py-1.5 text-xs font-medium focus-ring",
                cat === c ? "border-cyan-400/70 bg-cyan-500/15 text-accent" : "border-line text-muted hover:text-primary")}>{c}</button>
          ))}
        </div>
        <div className="relative md:w-56">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search news..." className="pl-9" aria-label="Search news" />
        </div>
      </div>
      {filtered.length === 0 ? <EmptyState title="No news found" /> : (
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((n) => (
            <Link key={n.id} href={`/news/${n.id}`} className="group focus-ring rounded-2xl">
              <Panel className="h-full overflow-hidden transition-all duration-200 group-hover:-translate-y-1 group-hover:border-cyan-400/40">
                <GradientThumb color={n.color} label={n.title} className="h-28 w-full" />
                <div className="p-5">
                  <div className="flex gap-1.5"><Badge className="text-accent border-cyan-400/30">{n.category}</Badge><Badge>{n.date}</Badge></div>
                  <h3 className="mt-2 font-semibold text-primary line-clamp-2">{n.title}</h3>
                  <p className="mt-2 text-sm text-muted line-clamp-2">{n.excerpt}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent">Read <ArrowRight className="h-3.5 w-3.5" /></span>
                </div>
              </Panel>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
