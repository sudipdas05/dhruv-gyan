
"use client";

import dynamic from "next/dynamic";
import { ArrowRight, Compass, FlaskConical, MapPin, Ship } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { stations } from "@/lib/mock-data";
import { Panel, Badge, SectionHead } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Globe = dynamic(() => import("@/components/globe/PolarGlobe"), {
  ssr: false,
  loading: () => <div className="h-[480px] rounded-3xl skeleton" />,
});

const REGIONS = ["All", "Arctic", "Antarctica", "Himalaya"];

export default function ExploreView() {
  const params = useSearchParams();
  const router = useRouter();
  const [selected, setSelected] = useState<string>(params.get("station") ?? "");
  const [region, setRegion] = useState(params.get("region") ?? "All");
  const st = stations.find((s) => s.id === selected);
  const filtered = region === "All" ? stations : stations.filter((s) => s.region === region);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHead eyebrow="Interactive Explorer" title="Follow the Journey from India to the Poles"
        sub="Drag the globe, zoom, and click a station marker to open its research profile. Arcs trace expedition routes from the Indian coast." />
      <div className="mb-5 flex flex-wrap gap-2">
        {REGIONS.map((r) => (
          <button key={r} onClick={() => setRegion(r)}
            className={cn("rounded-full border px-4 py-1.5 text-xs font-medium focus-ring",
              region === r ? "border-cyan-400/70 bg-cyan-500/15 text-accent" : "border-line text-muted hover:text-primary")}>
            {r}
          </button>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <Panel className="overflow-hidden p-2">
          <Globe onSelectStation={setSelected} className="h-[420px] md:h-[540px]" />
          <p className="px-3 pb-2 text-center text-[11px] uppercase tracking-[0.2em] text-muted">Drag to rotate · Scroll to zoom · Click a marker</p>
        </Panel>
        <div>
          {st ? (
            <Panel className="animate-fadeUp p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge className="mb-2 text-accent border-cyan-400/30">{st.region}</Badge>
                  <h2 className="text-2xl font-bold text-primary">{st.name}</h2>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                    <MapPin className="h-3.5 w-3.5" /> {st.country ?? "Antarctica"} · {st.lat.toFixed(2)}°, {st.lon.toFixed(2)}°
                  </p>
                </div>
                <button onClick={() => setSelected("")} className="text-xs text-muted hover:text-primary focus-ring rounded">Clear</button>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{st.purpose}</p>
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">Established {st.established}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-accent">Research areas</p>
                <ul className="mt-2 space-y-1.5">
                  {st.researchAreas.map((a) => (
                    <li key={a} className="flex gap-2 text-sm text-muted"><FlaskConical className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />{a}</li>
                  ))}
                </ul>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent">Current activities</p>
                <ul className="mt-2 space-y-1.5">
                  {st.currentActivities.map((a) => (
                    <li key={a} className="flex gap-2 text-sm text-muted"><Compass className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />{a}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button size="sm" onClick={() => router.push(`/repository?q=${encodeURIComponent(st.name)}`)}>
                  <FlaskConical className="h-3.5 w-3.5" /> View Research
                </Button>
                <Button size="sm" variant="outline" onClick={() => router.push("/expeditions")}>
                  <Ship className="h-3.5 w-3.5" /> View Expeditions
                </Button>
              </div>
            </Panel>
          ) : (
            <Panel className="p-6">
              <h2 className="text-lg font-semibold text-primary">Station index</h2>
              <p className="mt-1 text-sm text-muted">Select a marker on the globe, or choose below.</p>
              <ul className="mt-4 space-y-2">
                {filtered.map((s) => (
                  <li key={s.id}>
                    <button onClick={() => setSelected(s.id)}
                      className="flex w-full items-center justify-between rounded-xl border border-line bg-panel px-4 py-3 text-left transition-colors hover:border-cyan-400/50 focus-ring">
                      <span>
                        <span className="block text-sm font-semibold text-primary">{s.name}</span>
                        <span className="block text-xs text-muted">{s.region} · est. {s.established}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-accent" />
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[11px] text-muted">Himalayan sites are configurable sample stations demonstrating the platform&apos;s extensibility.</p>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}
