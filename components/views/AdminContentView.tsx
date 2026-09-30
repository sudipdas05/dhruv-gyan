
"use client";

import { CheckCircle2, Pencil, Send, XCircle } from "lucide-react";
import { useState } from "react";
import type { AiDraft, DraftStatus } from "@/lib/types";
import { useLS, toast } from "@/lib/store";
import { resources } from "@/lib/mock-data";
import { Panel, Badge } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Button from "@/components/ui/button";

const SEED: AiDraft[] = [{
  id: "draft-seed-1", sourceTitle: resources[10].title, contentType: "Instagram caption", tone: "Public-friendly", language: "English",
  title: "What India's scientists are doing at the bottom of the world", body: "", caption: "New from the 44th expedition...", hashtags: ["DhruvGyan", "NCPOR"],
  status: "in-review", createdAt: "2025-01-05",
}, {
  id: "draft-seed-2", sourceTitle: resources[2].title, contentType: "Press release", tone: "Professional", language: "English",
  title: "New findings from India's polar programme", body: "FOR IMMEDIATE RELEASE...", caption: "", hashtags: ["DhruvGyan"],
  status: "draft", createdAt: "2025-01-08",
}];

const STATUS_STYLE: Record<DraftStatus, string> = {
  draft: "text-muted border-line", "in-review": "text-amber-300 border-amber-400/40",
  approved: "text-sky-300 border-sky-400/40", published: "text-emerald-300 border-emerald-400/40", rejected: "text-rose-300 border-rose-400/40",
};

export default function AdminContentView() {
  const [drafts, setDrafts] = useLS<AiDraft[]>("dg_drafts", SEED);
  const [editBody, setEditBody] = useState<AiDraft | null>(null);

  const setStatus = (id: string, status: DraftStatus) => {
    setDrafts((d) => d.map((x) => (x.id === id ? { ...x, status } : x)));
    toast(`Moved to "${status}"`);
  };
  const saveBody = () => {
    if (!editBody) return;
    setDrafts((d) => d.map((x) => (x.id === editBody.id ? { ...x, caption: editBody.caption, title: editBody.title } : x)));
    setEditBody(null);
    toast("Draft edited");
  };

  return (
    <div>
      <Panel className="mb-6 flex flex-wrap items-center gap-3 p-4 text-xs text-muted">
        <span className="font-semibold uppercase tracking-wider text-accent">Workflow</span>
        <span>AI Generated → Draft → Human Review → Approved → Published</span>
        <span className="ml-auto flex items-center gap-1.5 text-amber-300"><Send className="h-3.5 w-3.5" /> AI content never publishes without human approval</span>
      </Panel>
      <div className="space-y-4">
        {drafts.length === 0 && <Panel className="p-8 text-center text-sm text-muted">No drafts yet — generate content in the Media Studio (save a draft from any AI output).</Panel>}
        {drafts.map((d) => (
          <Panel key={d.id} className="p-5">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge className={STATUS_STYLE[d.status]}>{d.status}</Badge>
              <Badge>{d.contentType}</Badge><Badge>{d.tone}</Badge><Badge>{d.language}</Badge><Badge>{d.createdAt}</Badge>
            </div>
            <h3 className="mt-2 font-semibold text-primary">{d.title}</h3>
            <p className="mt-1 text-xs text-muted">Source: {d.sourceTitle}</p>
            <p className="mt-2 line-clamp-2 text-sm text-muted">{d.caption || d.body}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant="soft" onClick={() => setEditBody({ ...d })}><Pencil className="h-3.5 w-3.5" /> Edit</Button>
              {d.status !== "in-review" && <Button size="sm" variant="outline" onClick={() => setStatus(d.id, "in-review")}>Send to review</Button>}
              {d.status !== "approved" && <Button size="sm" variant="outline" onClick={() => setStatus(d.id, "approved")}><CheckCircle2 className="h-3.5 w-3.5" /> Approve</Button>}
              {d.status !== "published" && <Button size="sm" onClick={() => setStatus(d.id, "published")}>Publish</Button>}
              {d.status !== "rejected" && <Button size="sm" variant="danger" onClick={() => setStatus(d.id, "rejected")}><XCircle className="h-3.5 w-3.5" /> Reject</Button>}
            </div>
          </Panel>
        ))}
      </div>
      <Modal open={!!editBody} onClose={() => setEditBody(null)} title="Edit draft" wide>
        {editBody && (
          <div className="space-y-4">
            <Textarea value={editBody.title} onChange={(e) => setEditBody({ ...editBody, title: e.target.value })} className="min-h-[48px]" aria-label="Title" />
            <Textarea value={editBody.caption || editBody.body} onChange={(e) => setEditBody({ ...editBody, caption: e.target.value })} className="min-h-[180px]" aria-label="Body" />
            <Button onClick={saveBody}>Save changes</Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
