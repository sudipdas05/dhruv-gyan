
"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { newsItems } from "@/lib/mock-data";
import { Panel, Badge } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { GradientThumb, EmptyState } from "@/components/ui/misc";

export default function NewsDetailView({ id }: { id: string }) {
  const n = newsItems.find((x) => x.id === id);
  if (!n) return <EmptyState title="Article not found" action={<Link href="/news"><Button variant="outline">All news</Button></Link>} />;
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <Link href="/news" className="flex items-center gap-1.5 text-sm text-muted hover:text-accent focus-ring rounded"><ArrowLeft className="h-4 w-4" /> All news</Link>
      <div className="mt-4 flex gap-1.5"><Badge className="text-accent border-cyan-400/30">{n.category}</Badge><Badge>{n.date}</Badge></div>
      <h1 className="mt-3 text-3xl font-bold leading-tight text-primary">{n.title}</h1>
      <GradientThumb color={n.color} label={n.title} className="mt-6 h-52 w-full rounded-2xl" />
      <Panel className="mt-6 p-6">
        <p className="text-base leading-relaxed text-muted">{n.body}</p>
        <p className="mt-6 border-t border-line pt-4 text-xs text-muted">Demonstration article — sample content for the DHRUV GYAN portal.</p>
      </Panel>
    </div>
  );
}
