
"use client";

import { ChevronDown, Download, Eye, FileText, Quote, Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { resources } from "@/lib/mock-data";
import type { Resource } from "@/lib/types";
import { searchResources, getFacets, emptyFilters, type SearchFilters, type SortKey } from "@/lib/search";
import { apa, ieee, plain } from "@/lib/cite";
import { useLS, toast } from "@/lib/store";
import { TYPE_LABELS } from "@/lib/utils";
import { Panel, Badge, SectionHead } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Tabs from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/misc";
import Button from "@/components/ui/button";

const TABS: { id: string; label: string; match: (r: Resource) => boolean }[] = [
  { id: "all", label: "All", match: () => true },
  { id: "publication", label: "Publications", match: (r) => r.type === "publication" },
  { id: "expedition-report", label: "Expedition Reports", match: (r) => r.type === "expedition-report" },
  { id: "dataset", label: "Datasets", match: (r) => r.type === "dataset" },
  { id: "photo", label: "Photos", match: (r) => r.type === "photo" },
  { id: "video", label: "Videos", match: (r) => r.type === "video" },
  { id: "education", label: "Educational", match: (r) => r.type === "education" },
  { id: "activity", label: "Activities", match: (r) => r.type === "activity" },
];

function toggle(list: (string | number)[], v: string | number) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

function CiteModal({ r, open, onClose }: { r: Resource | null; open: boolean; onClose: () => void }) {
  const [style, setStyle] = useState<"APA" | "IEEE" | "Plain">("APA");
  if (!r) return null;
  const text = style === "APA" ? apa(r) : style === "IEEE" ? ieee(r) : plain(r);
  return (
    <Modal open={open} onClose={onClose} title="Cite this resource">
      <div className="mb-3 flex gap-2">
        {(["APA", "IEEE", "Plain"] as const).map((s) => (
          <button key={s} onClick={() => setStyle(s)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium focus-ring ${style === s ? "border-cyan-400/70 bg-cyan-500/15 text-accent" : "border-line text-muted"}`}>{s}</button>
        ))}
      </div>
      <p className="rounded-xl border border-line bg-input p-4 text-sm leading-relaxed text-primary">{text}</p>
      <Button className="mt-4 w-full" onClick={() => { navigator.clipboard?.writeText(text); toast("Citation copied to clipboard"); }}>
        <Quote className="h-4 w-4" /> Copy citation
      </Button>
    </Modal>
  );
}

export default function RepositoryView() {
  const params = useSearchParams();
  const [pool] = useLS<Resource[]>("dg_resources", resources);
  const [q, setQ] = useState(params.get("q") ?? "");
  const [tab, setTab] = useState("all");
  const [filters, setFilters] = useState<SearchFilters>({ ...emptyFilters });
  const [sort, setSort] = useState<SortKey>("relevance");
  const [limit, setLimit] = useState(8);
  const [preview, setPreview] = useState<Resource | null>(null);
  const [cite, setCite] = useState<Resource | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const facets = useMemo(() => getFacets(pool), [pool]);
  const tabMatch = TABS.find((t) => t.id === tab)!.match;
  const results = useMemo(
    () => searchResources(q, filters, sort, pool).filter((r) => tabMatch(r)),
    [q, filters, sort, pool, tabMatch]);
  const visible = results.slice(0, limit);
  const activeFilters = Object.values(filters).flat().length;

  const facet = (label: string, values: (string | number)[], cur: (string | number)[], set: (v: (string | number)[]) => void) => (
    <div className="mb-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">{label}</p>
      <div className="flex flex-col gap-1.5">
        {values.map((v) => (
          <label key={String(v)} className="flex cursor-pointer items-center gap-2 text-sm text-muted hover:text-primary">
            <input type="checkbox" checked={cur.includes(v)} onChange={() => set(toggle(cur, v))}
              className="h-3.5 w-3.5 rounded border-line bg-input accent-cyan-500" />
            {String(v)}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHead eyebrow="Knowledge Repository" title="Polar Knowledge Repository"
        sub="Search and explore India&apos;s polar scientific knowledge — reports, publications, datasets, media and learning resources." />
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input value={q} onChange={(e) => { setQ(e.target.value); setLimit(8); }} placeholder="Search reports, publications, datasets, photographs and videos..."
            className="pl-10" aria-label="Search repository" />
        </div>
        <div className="flex gap-2">
          <Select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="w-40" aria-label="Sort results">
            <option value="relevance">Relevance</option><option value="newest">Newest</option>
            <option value="oldest">Oldest</option><option value="az">A–Z</option>
          </Select>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="md:hidden">Filters {activeFilters > 0 && `(${activeFilters})`}</Button>
        </div>
      </div>

      <Tabs tabs={TABS.map((t) => ({ id: t.id, label: t.label, count: pool.filter((r) => t.match(r)).length }))} active={tab} onChange={(id) => { setTab(id); setLimit(8); }} className="mb-6" />

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className={showFilters ? "block" : "hidden lg:block"}>
          <Panel className="sticky top-24 max-h-[75vh] overflow-y-auto p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-primary">Filters</p>
              {activeFilters > 0 && (
                <button onClick={() => setFilters(emptyFilters)} className="text-[11px] text-accent hover:underline focus-ring rounded">Clear all</button>
              )}
            </div>
            {facet("Year", facets.years, filters.years, (v) => setFilters({ ...filters, years: v as number[] }))}
            {facet("Region", facets.regions, filters.regions, (v) => setFilters({ ...filters, regions: v as SearchFilters["regions"] }))}
            {facet("Scientific Domain", facets.domains, filters.domains, (v) => setFilters({ ...filters, domains: v as SearchFilters["domains"] }))}
            {facet("Expedition", facets.expeditions, filters.expeditions, (v) => setFilters({ ...filters, expeditions: v as string[] }))}
            {facet("Author", facets.authors.slice(0, 12), filters.authors, (v) => setFilters({ ...filters, authors: v as string[] }))}
            {facet("Language", facets.languages, filters.languages, (v) => setFilters({ ...filters, languages: v as SearchFilters["languages"] }))}
          </Panel>
        </aside>

        <div>
          <p className="mb-4 text-sm text-muted">{results.length} result{results.length === 1 ? "" : "s"} {q && <>for <span className="text-accent">&ldquo;{q}&rdquo;</span></>}</p>
          {visible.length === 0 ? (
            <EmptyState title="No matching records" sub="Try broadening your search or clearing some filters." />
          ) : (
            <ul className="space-y-4">
              {visible.map((r) => (
                <li key={r.id}>
                  <Panel className="p-5 transition-colors hover:border-cyan-400/40">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge className="text-accent border-cyan-400/30">{TYPE_LABELS[r.type]}</Badge>
                      <Badge>{r.year}</Badge><Badge>{r.region}</Badge><Badge>{r.domain}</Badge>
                      {!r.published && <Badge className="text-amber-300 border-amber-400/40">Unpublished</Badge>}
                    </div>
                    <Link href={`/repository/${r.id}`} className="mt-2 block font-semibold text-primary hover:text-accent focus-ring rounded line-clamp-2">{r.title}</Link>
                    <p className="mt-1 text-xs text-muted">{r.authors.join(", ")}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">{r.abstract}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">{r.tags.slice(0, 4).map((t) => <Badge key={t}>#{t}</Badge>)}</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link href={`/repository/${r.id}`}><Button size="sm"><Eye className="h-3.5 w-3.5" /> View</Button></Link>
                      <Button size="sm" variant="outline" onClick={() => setPreview(r)}><FileText className="h-3.5 w-3.5" /> Preview</Button>
                      <Button size="sm" variant="outline" onClick={() => { toast("Demo: file would download from Supabase Storage"); }}>
                        <Download className="h-3.5 w-3.5" /> Download
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setCite(r)}><Quote className="h-3.5 w-3.5" /> Cite</Button>
                    </div>
                  </Panel>
                </li>
              ))}
            </ul>
          )}
          {results.length > limit && (
            <Button variant="outline" className="mt-6 w-full" onClick={() => setLimit(limit + 8)}>
              <ChevronDown className="h-4 w-4" /> Load more ({results.length - limit} remaining)
            </Button>
          )}
        </div>
      </div>

      <Modal open={!!preview} onClose={() => setPreview(null)} title="Record preview" wide>
        {preview && (
          <div>
            <div className="mb-3 flex flex-wrap gap-1.5">
              <Badge className="text-accent border-cyan-400/30">{TYPE_LABELS[preview.type]}</Badge><Badge>{preview.year}</Badge><Badge>{preview.region}</Badge><Badge>{preview.domain}</Badge>
            </div>
            <h3 className="text-lg font-semibold text-primary">{preview.title}</h3>
            <p className="mt-1 text-xs text-muted">{preview.authors.join(", ")}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{preview.abstract}</p>
            <ul className="mt-4 space-y-2">
              {preview.keyPoints.map((k) => (
                <li key={k} className="flex gap-2 text-sm text-muted"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />{k}</li>
              ))}
            </ul>
            <Link href={`/repository/${preview.id}`}><Button className="mt-5">Open full record</Button></Link>
          </div>
        )}
      </Modal>
      <CiteModal r={cite} open={!!cite} onClose={() => setCite(null)} />
    </div>
  );
}
