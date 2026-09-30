
"use client";

import { BookOpen, Copy, Download, ExternalLink, Eye, FileText, Quote, Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { resources } from "@/lib/mock-data";
import type { Resource } from "@/lib/types";
import { relatedResources } from "@/lib/search";
import { apa, ieee, plain } from "@/lib/cite";
import { useLS, toast } from "@/lib/store";
import { TYPE_LABELS } from "@/lib/utils";
import { Panel, Badge } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { EmptyState } from "@/components/ui/misc";
import Modal from "@/components/ui/modal";

export default function ResourceDetailView({ id }: { id: string }) {
  const [pool] = useLS<Resource[]>("dg_resources", resources);
  const r = pool.find((x) => x.id === id);
  const [citeStyle, setCiteStyle] = useState<"APA" | "IEEE" | "Plain">("APA");
  const [citeOpen, setCiteOpen] = useState(false);

  if (!r) return <EmptyState title="Record not found" sub="It may have been removed by an administrator." action={<Link href="/repository"><Button variant="outline">Back to repository</Button></Link>} />;

  const cite = citeStyle === "APA" ? apa(r) : citeStyle === "IEEE" ? ieee(r) : plain(r);
  const related = relatedResources(r);

  const copy = (text: string, label: string) => { navigator.clipboard?.writeText(text); toast(label); };
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) { try { await navigator.share({ title: r.title, url }); } catch { /* cancelled */ } }
    else copy(url, "Link copied to clipboard");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <Link href="/repository" className="text-sm text-muted hover:text-accent focus-ring rounded">← Knowledge Repository</Link>
      <div className="mt-4 flex flex-wrap gap-1.5">
        <Badge className="text-accent border-cyan-400/30">{TYPE_LABELS[r.type]}</Badge>
        <Badge>{r.year}</Badge><Badge>{r.region}</Badge><Badge>{r.domain}</Badge>
        {r.expedition && <Badge>{r.expedition}</Badge>}
        <Badge>{r.language}</Badge>
      </div>
      <h1 className="mt-3 text-2xl font-bold leading-tight text-primary md:text-3xl">{r.title}</h1>
      <p className="mt-2 text-sm text-muted">{r.authors.join(", ")}</p>
      <p className="mt-1 flex flex-wrap items-center gap-4 text-xs text-muted">
        <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {r.views} views</span>
        <span className="flex items-center gap-1"><Download className="h-3.5 w-3.5" /> {r.downloads} downloads</span>
        {r.fileSize && <span className="flex items-center gap-1"><FileText className="h-3.5 w-3.5" /> {r.fileSize}</span>}
        {r.doi && <span className="text-accent">{r.doi}</span>}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button onClick={() => document.getElementById("reader")?.scrollIntoView({ behavior: "smooth" })}>
          <BookOpen className="h-4 w-4" /> Read Online
        </Button>
        <Button variant="outline" onClick={() => toast("Demo: file served from Supabase Storage in production")}>
          <Download className="h-4 w-4" /> Download
        </Button>
        <Button variant="outline" onClick={() => setCiteOpen(true)}><Quote className="h-4 w-4" /> Copy Citation</Button>
        <Button variant="ghost" onClick={share}><Share2 className="h-4 w-4" /> Share</Button>
      </div>

      <Panel className="mt-8 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">Abstract</h2>
        <p className="mt-3 leading-relaxed text-muted">{r.abstract}</p>
        <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider text-accent">Key points</h2>
        <ul className="mt-3 space-y-2">
          {r.keyPoints.map((k) => (
            <li key={k} className="flex gap-2.5 text-sm leading-relaxed text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />{k}
            </li>
          ))}
        </ul>
        <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider text-accent">Keywords</h2>
        <div className="mt-3 flex flex-wrap gap-1.5">{r.keywords.map((k) => <Badge key={k}>{k}</Badge>)}</div>
      </Panel>

      <Panel className="mt-6 scroll-mt-24 p-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">Online reader</h2>
          <Badge>Demo</Badge>
        </div>
        <div className="rounded-xl border border-line bg-input p-6">
          <p className="text-sm leading-relaxed text-muted">
            In production this pane embeds the full PDF via <code className="text-accent">react-pdf</code> or the
            browser viewer, streamed from Supabase Storage. In this demonstration build the structured record
            (abstract, key points and metadata) above stands in for the document body.
          </p>
          <p className="mt-3 flex items-center gap-2 text-xs text-muted">
            <ExternalLink className="h-3.5 w-3.5 text-accent" /> Connect Supabase Storage to enable live PDF streaming.
          </p>
        </div>
      </Panel>

      <Panel className="mt-6 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">Citation</h2>
        <p className="mt-3 rounded-xl border border-line bg-input p-4 text-sm leading-relaxed text-primary">{cite}</p>
        <Button variant="soft" className="mt-4" onClick={() => copy(cite, "Citation copied")}>
          <Copy className="h-4 w-4" /> Copy citation
        </Button>
      </Panel>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-primary">Related resources</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {related.map((x) => (
              <Link key={x.id} href={`/repository/${x.id}`} className="focus-ring rounded-2xl">
                <Panel className="h-full p-5 transition-colors hover:border-cyan-400/40">
                  <div className="flex gap-1.5"><Badge>{TYPE_LABELS[x.type]}</Badge><Badge>{x.year}</Badge><Badge>{x.domain}</Badge></div>
                  <p className="mt-2 text-sm font-semibold text-primary line-clamp-2">{x.title}</p>
                </Panel>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Modal open={citeOpen} onClose={() => setCiteOpen(false)} title="Citation format">
        <div className="mb-3 flex gap-2">
          {(["APA", "IEEE", "Plain"] as const).map((s) => (
            <button key={s} onClick={() => setCiteStyle(s)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium focus-ring ${citeStyle === s ? "border-cyan-400/70 bg-cyan-500/15 text-accent" : "border-line text-muted"}`}>{s}</button>
          ))}
        </div>
        <p className="rounded-xl border border-line bg-input p-4 text-sm leading-relaxed text-primary">{cite}</p>
        <Button className="mt-4 w-full" onClick={() => { copy(cite, "Citation copied"); setCiteOpen(false); }}>
          <Copy className="h-4 w-4" /> Copy
        </Button>
      </Modal>
    </div>
  );
}
