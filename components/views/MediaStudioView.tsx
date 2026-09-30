
"use client";

import { Copy, RefreshCw, Save } from "lucide-react";
import { useMemo, useState } from "react";
import { resources, newsItems } from "@/lib/mock-data";
import { CONTENT_TYPES, TONES, LANGUAGES, generateContent, draftFromOutput, type StudioOutput } from "@/lib/studio";
import { useLS, toast } from "@/lib/store";
import type { AiDraft } from "@/lib/types";
import { Panel, SectionHead, Badge } from "@/components/ui/card";
import { Select, Field } from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function MediaStudioView() {
  const sources = useMemo(() => [
    ...resources.map((r) => ({ id: r.id, label: `[${r.type}] ${r.title}`, title: r.title, abstract: r.abstract, type: r.domain })),
    ...newsItems.map((n) => ({ id: n.id, label: `[news] ${n.title}`, title: n.title, abstract: n.body, type: "News" })),
  ], []);
  const [sourceId, setSourceId] = useState(sources[10].id);
  const [contentType, setContentType] = useState<string>(CONTENT_TYPES[0]);
  const [tone, setTone] = useState<string>(TONES[2]);
  const [language, setLanguage] = useState<string>(LANGUAGES[0]);
  const [variant, setVariant] = useState(0);
  const [, setDrafts] = useLS<AiDraft[]>("dg_drafts", []);

  const source = sources.find((s) => s.id === sourceId)!;
  const out: StudioOutput = useMemo(() => generateContent({
    sourceId, sourceTitle: source.title, sourceType: source.type, sourceAbstract: source.abstract, contentType, tone, language,
  }), [sourceId, source, contentType, tone, language, variant]); // eslint-disable-line react-hooks/exhaustive-deps

  const copy = (text: string) => { navigator.clipboard?.writeText(text); toast("Copied to clipboard"); };
  const saveDraft = () => {
    const base = draftFromOutput({ sourceId, sourceTitle: source.title, sourceType: source.type, sourceAbstract: source.abstract, contentType, tone, language }, out);
    setDrafts((d) => [{ ...base, id: `draft-${Date.now()}`, createdAt: new Date().toISOString().slice(0, 10) }, ...d]);
    toast("Draft saved — review it in Admin → AI Content");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <SectionHead eyebrow="AI Media Studio" title="One Report. Many Stories."
        sub="Transform approved scientific records into website articles, social captions, press releases and more — every output passes through human review before publishing." />
      <Badge className="mb-6 border-amber-400/40 bg-amber-400/10 text-amber-300">Demo generation mode — no AI API key configured</Badge>
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <Panel className="h-fit p-5">
          <h3 className="mb-4 text-sm font-semibold text-primary">Source &amp; format</h3>
          <div className="space-y-4">
            <Field label="Content source">
              <Select value={sourceId} onChange={(e) => setSourceId(e.target.value)}>
                {sources.map((s) => <option key={s.id} value={s.id}>{s.label.length > 60 ? s.label.slice(0, 57) + "..." : s.label}</option>)}
              </Select>
            </Field>
            <Field label="Content type">
              <Select value={contentType} onChange={(e) => setContentType(e.target.value)}>
                {CONTENT_TYPES.map((c) => <option key={c}>{c}</option>)}
              </Select>
            </Field>
            <Field label="Tone">
              <Select value={tone} onChange={(e) => setTone(e.target.value)}>
                {TONES.map((t) => <option key={t}>{t}</option>)}
              </Select>
            </Field>
            <Field label="Language">
              <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
              </Select>
            </Field>
            <Button className="w-full" onClick={() => { setVariant(0); toast("Content generated (demo mode)"); }}>Generate Content</Button>
          </div>
        </Panel>
        <Panel className="p-5 md:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-1.5"><Badge className="text-accent border-cyan-400/30">{contentType}</Badge><Badge>{tone}</Badge><Badge>{language}</Badge></div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setVariant((v) => (v + 1) % 3)}><RefreshCw className="h-3.5 w-3.5" /> Regenerate</Button>
              <Button size="sm" variant="outline" onClick={saveDraft}><Save className="h-3.5 w-3.5" /> Save Draft</Button>
              <Button size="sm" onClick={() => toast("In production, publishes after admin approval (see Admin → AI Content)")}>Publish</Button>
            </div>
          </div>
          <h3 className="text-lg font-bold text-primary">{out.title}</h3>
          <p className="mt-2 text-sm text-muted"><span className="font-semibold text-accent">Summary:</span> {out.summary}</p>
          <div className="mt-4 rounded-xl border border-line bg-input p-4">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-accent">Body / Caption</p>
            <div className="space-y-2 whitespace-pre-wrap text-sm leading-relaxed text-muted">{out.body}</div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">Hashtags</span>
            {out.hashtags.map((h) => <Badge key={h}>#{h}</Badge>)}
            <Button size="sm" variant="ghost" className="ml-auto" onClick={() => copy(`${out.title}\n\n${out.body}\n\n${out.hashtags.map((h) => "#" + h).join(" ")}`)}>
              <Copy className="h-3.5 w-3.5" /> Copy all
            </Button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
