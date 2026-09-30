
"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { resources } from "@/lib/mock-data";
import type { Resource } from "@/lib/types";
import { useLS, toast } from "@/lib/store";
import { Panel } from "@/components/ui/card";
import { Input, Select, Textarea, Field } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Button from "@/components/ui/button";

const EMPTY: Partial<Resource> = { title: "", year: 2024, authors: [], region: "Antarctica", domain: "Glaciology", type: "publication", abstract: "", keywords: [], published: true, keyPoints: [], language: "English", views: 0, downloads: 0, tags: [], citation: "" };

export default function AdminResourcesView() {
  const [pool, setPool] = useLS<Resource[]>("dg_resources", resources);
  const [editing, setEditing] = useState<Resource | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => { setEditing({ ...EMPTY, id: `res-custom-${Date.now()}` } as Resource); setIsNew(true); };
  const save = () => {
    if (!editing) return;
    if (!editing.title.trim()) { toast("Title is required"); return; }
    const citation = `${editing.authors.join(", ") || "NCPOR"} (${editing.year}). ${editing.title}. National Centre for Polar and Ocean Research.`;
    const rec = { ...editing, citation };
    setPool((p) => (isNew ? [rec, ...p] : p.map((x) => (x.id === rec.id ? rec : x))));
    setEditing(null);
    toast(isNew ? "Resource created" : "Resource updated");
  };
  const del = (id: string) => {
    if (!confirm("Delete this resource?")) return;
    setPool((p) => p.filter((x) => x.id !== id));
    toast("Resource deleted");
  };
  const togglePub = (id: string) => {
    setPool((p) => p.map((x) => (x.id === id ? { ...x, published: !x.published } : x)));
    toast("Visibility updated");
  };
  const set = (patch: Partial<Resource>) => setEditing((e) => (e ? { ...e, ...patch } : e));

  return (
    <div>
      <div className="mb-5 flex justify-end"><Button onClick={openNew}><Plus className="h-4 w-4" /> New resource</Button></div>
      <Panel className="overflow-x-auto p-0">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wider text-muted">
              <th className="px-4 py-3">Title</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Region</th><th className="px-4 py-3">Domain</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pool.map((r) => (
              <tr key={r.id} className="border-b border-line/60 last:border-0 hover:bg-cyan-500/5">
                <td className="max-w-[260px] px-4 py-3 font-medium text-primary"><span className="line-clamp-1">{r.title}</span></td>
                <td className="px-4 py-3 text-muted">{r.type}</td>
                <td className="px-4 py-3 text-muted">{r.year}</td>
                <td className="px-4 py-3 text-muted">{r.region}</td>
                <td className="px-4 py-3 text-muted">{r.domain}</td>
                <td className="px-4 py-3">
                  <button onClick={() => togglePub(r.id)}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold focus-ring ${r.published ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"}`}>
                    {r.published ? "Published" : "Unpublished"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    <button onClick={() => { setEditing(r); setIsNew(false); }} aria-label="Edit" className="rounded-lg p-1.5 text-muted hover:text-accent hover:bg-cyan-500/10 focus-ring"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => del(r.id)} aria-label="Delete" className="rounded-lg p-1.5 text-muted hover:text-rose-400 hover:bg-rose-500/10 focus-ring"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
      <Modal open={!!editing} onClose={() => setEditing(null)} title={isNew ? "Create resource" : "Edit resource"} wide>
        {editing && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2"><Field label="Title"><Input value={editing.title} onChange={(e) => set({ title: e.target.value })} /></Field></div>
            <Field label="Content type">
              <Select value={editing.type} onChange={(e) => set({ type: e.target.value as Resource["type"] })}>
                {["publication", "expedition-report", "dataset", "photo", "video", "education", "activity"].map((t) => <option key={t} value={t}>{t}</option>)}
              </Select>
            </Field>
            <Field label="Year"><Input type="number" value={editing.year} onChange={(e) => set({ year: Number(e.target.value) })} /></Field>
            <Field label="Region">
              <Select value={editing.region} onChange={(e) => set({ region: e.target.value as Resource["region"] })}>
                {["Antarctica", "Arctic", "Himalaya", "Southern Ocean"].map((x) => <option key={x}>{x}</option>)}
              </Select>
            </Field>
            <Field label="Scientific domain">
              <Select value={editing.domain} onChange={(e) => set({ domain: e.target.value as Resource["domain"] })}>
                {["Atmospheric Science", "Glaciology", "Oceanography", "Climate Science", "Marine Biology", "Geology", "Earth Observation", "Meteorology", "Polar Ecology", "Human Biology", "Education & Outreach"].map((x) => <option key={x}>{x}</option>)}
              </Select>
            </Field>
            <div className="md:col-span-2"><Field label="Authors (comma separated)"><Input value={editing.authors.join(", ")} onChange={(e) => set({ authors: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} /></Field></div>
            <div className="md:col-span-2"><Field label="Abstract"><Textarea value={editing.abstract} onChange={(e) => set({ abstract: e.target.value })} /></Field></div>
            <Field label="Keywords (comma separated)"><Input value={editing.keywords.join(", ")} onChange={(e) => { const v = e.target.value.split(",").map((s) => s.trim()).filter(Boolean); set({ keywords: v, tags: v }); }} /></Field>
            <Field label="Expedition"><Input value={editing.expedition ?? ""} onChange={(e) => set({ expedition: e.target.value })} /></Field>
            <div className="md:col-span-2"><Field label="Key points (one per line)"><Textarea value={editing.keyPoints.join("\n")} onChange={(e) => set({ keyPoints: e.target.value.split("\n").filter(Boolean) })} /></Field></div>
            <label className="flex items-center gap-2 text-sm text-muted"><input type="checkbox" className="accent-cyan-500" checked={editing.published} onChange={(e) => set({ published: e.target.checked })} /> Published (visible to public)</label>
            <div className="flex gap-2 md:col-span-2">
              <Button onClick={save}>Save resource</Button>
              <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
