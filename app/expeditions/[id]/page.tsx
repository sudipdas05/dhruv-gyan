import type { Metadata } from "next";
import ExpeditionDetailView from "@/components/views/ExpeditionDetailView";
import { expeditions } from "@/lib/mock-data";

export function generateStaticParams() {
  return expeditions.map((e) => ({ id: e.id }));
}

export const metadata: Metadata = { title: "Expedition" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ExpeditionDetailView id={id} />;
}
