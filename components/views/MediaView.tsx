
"use client";

import { Camera, Copy, Download, Play, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { mediaAssets } from "@/lib/mock-data";
import { toast } from "@/lib/store";
import { Panel, SectionHead, Badge } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Tabs from "@/components/ui/tabs";
import { EmptyState, GradientThumb } from "@/components/ui/misc";
import Button from "@/components/ui/button";

const KIND_TABS: { id: string; label: string }[] = [
  { id: "all", label: "All" }, { id: "photo", label: "Photos" }, { id: "video", label: "Videos" },
  { id: "infographic", label: "Infographics" }, { id: "audio", label: "Audio" }, { id: "press", label: "Press Materials" },
];

export default function MediaView() {
  const params = useSearchParams();
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string>(params.get("asset") ?? "");
  const open = mediaAssets.find((m) => m.id === openId);

  const filtered = useMemo(() => mediaAssets.filter((m) => {
    if (tab !== "all" && m.kind !== tab) return false;
    if (q && !(m.title + m.location + m.tags.join(" ")).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [tab, q]);

  const attribution = (m: NonNullable<typeof open>) => `${m.title} — ${m.credit}. Via DHRUV GYAN (demo).`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHead eyebrow="Digital Asset Management" title="Media Hub"
        sub="Cleared photographs, films, infographics and press material from India&apos;s polar programme. Every asset carries credit and attribution." />
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Tabs tabs={KIND_TABS.map((t) => ({ id: t.id, label: t.label, count: t.id === "all" ? mediaAssets.length : mediaAssets.filter((m) => m.kind === t.id).length }))} active={tab} onChange={setTab} />
        <div className="relative md:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search media..." className="pl-9" aria-label="Search media" />
        </div>
      </div>
      {filtered.length === 0 ? <EmptyState title="No media found" sub="Try a different search or tab." /> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((m) => (
            <button key={m.id} onClick={() => setOpenId(m.id)} className="group focus-ring rounded-2xl text-left">
              <Panel className="h-full overflow-hidden transition-all duration-200 group-hover:-translate-y-1 group-hover:border-cyan-400/40">
                <div className="relative">
                  <GradientThumb color={m.color} label={m.title} icon={m.kind === "video" ? <Play className="h-8 w-8" /> : <Camera className="h-8 w-8" />} className="h-44 w-full" />
                  {m.duration && <span className="absolute bottom-2 right-2 rounded bg-polar-950/80 px-1.5 py-0.5 text-[10px] text-white">{m.duration}</span>}
                </div>
                <div className="p-4">
                  <div className="flex gap-1.5"><Badge className="text-accent border-cyan-400/30">{m.kind}</Badge><Badge>{m.date}</Badge></div>
                  <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-primary">{m.title}</h3>
                  <p className="mt-1 text-[11px] text-muted">{m.location} · {m.expedition}</p>
                </div>
              </Panel>
            </button>
          ))}
        </div>
      )}
      <Modal open={!!open} onClose={() => setOpenId("")} title={open?.title ?? ""} wide>
        {open && (
          <div>
            <GradientThumb color={open.color} label={open.title} icon={open.kind === "video" ? <Play className="h-12 w-12" /> : <Camera className="h-12 w-12" />} className="h-64 w-full rounded-xl" />
            {open.kind === "video" && (
              <p className="mt-3 rounded-lg border border-line bg-input px-3 py-2 text-xs text-muted">
                Demo build: video streams from Supabase Storage in production. Duration {open.duration ?? "—"}.
              </p>
            )}
            <p className="mt-4 text-sm leading-relaxed text-muted">{open.description}</p>
            <div className="mt-4 grid gap-x-6 gap-y-2 text-xs text-muted sm:grid-cols-2">
              <p><span className="text-accent">Date:</span> {open.date}</p>
              <p><span className="text-accent">Location:</span> {open.location}</p>
              <p><span className="text-accent">Expedition:</span> {open.expedition}</p>
              <p><span className="text-accent">Credit:</span> {open.credit}</p>
              <p><span className="text-accent">License:</span> Demo — cleared for outreach use</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">{open.tags.map((t) => <Badge key={t}>#{t}</Badge>)}</div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => toast("Demo: asset download from Supabase Storage")}><Download className="h-3.5 w-3.5" /> Download</Button>
              <Button size="sm" variant="outline" onClick={() => { navigator.clipboard?.writeText(attribution(open)); toast("Attribution copied"); }}>
                <Copy className="h-3.5 w-3.5" /> Copy attribution
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
