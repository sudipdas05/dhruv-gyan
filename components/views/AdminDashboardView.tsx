
"use client";

import { BookOpen, Clock, FileText, FolderOpen, Image as ImageIcon, Database, Video, CheckCircle2 } from "lucide-react";
import { Panel, StatCard } from "@/components/ui/card";
import { resources, mediaAssets, newsItems } from "@/lib/mock-data";
import { useLS } from "@/lib/store";
import type { AiDraft } from "@/lib/types";

export default function AdminDashboardView() {
  const [drafts] = useLS<AiDraft[]>("dg_drafts", []);
  const pending = drafts.filter((d) => d.status === "in-review" || d.status === "draft").length;
  const photos = mediaAssets.filter((m) => m.kind === "photo").length;
  const videos = mediaAssets.filter((m) => m.kind === "video").length;
  const years = Array.from(new Set(resources.map((r) => r.year))).sort((a, b) => a - b).slice(-6);
  const byYear = years.map((y) => ({ y, n: resources.filter((r) => r.year === y).length }));
  const maxYear = Math.max(...byYear.map((b) => b.n), 1);
  const byType = [
    { label: "Publications", n: resources.filter((r) => r.type === "publication").length },
    { label: "Reports", n: resources.filter((r) => r.type === "expedition-report").length },
    { label: "Datasets", n: resources.filter((r) => r.type === "dataset").length },
    { label: "Media", n: resources.filter((r) => ["photo", "video"].includes(r.type)).length },
  ];
  const maxType = Math.max(...byType.map((b) => b.n), 1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total resources" value={String(resources.length)} icon={<FolderOpen className="h-5 w-5" />} />
        <StatCard label="Publications" value={String(resources.filter((r) => r.type === "publication").length)} icon={<FileText className="h-5 w-5" />} />
        <StatCard label="Photos / Videos" value={`${photos} / ${videos}`} icon={<ImageIcon className="h-5 w-5" />} />
        <StatCard label="Pending AI review" value={String(pending)} icon={<Clock className="h-5 w-5" />} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel className="p-5">
          <h3 className="mb-4 text-sm font-semibold text-primary">Resources by year</h3>
          <div className="flex h-36 items-end gap-4">
            {byYear.map((b) => (
              <div key={b.y} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="text-xs text-muted">{b.n}</span>
                <div className="w-full rounded-t-md bg-gradient-to-t from-cyan-500/60 to-sky-400/80" style={{ height: `${(b.n / maxYear) * 100}%` }} />
                <span className="text-[11px] text-muted">{b.y}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="p-5">
          <h3 className="mb-4 text-sm font-semibold text-primary">Resources by type</h3>
          <div className="space-y-3">
            {byType.map((b) => (
              <div key={b.label}>
                <div className="mb-1 flex justify-between text-xs text-muted"><span>{b.label}</span><span>{b.n}</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-panel">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500" style={{ width: `${(b.n / maxType) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Panel className="p-5">
        <h3 className="mb-3 text-sm font-semibold text-primary">Recent activity</h3>
        <ul className="space-y-2 text-sm text-muted">
          <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> {newsItems.length} news items published</li>
          <li className="flex items-center gap-2"><Database className="h-4 w-4 text-accent" /> {resources.filter((r) => r.type === "dataset").length} datasets awaiting archival verification</li>
          <li className="flex items-center gap-2"><Video className="h-4 w-4 text-accent" /> {videos} videos cleared for the Media Hub</li>
          <li className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-accent" /> 8 education modules mapped to curricula</li>
        </ul>
      </Panel>
    </div>
  );
}
