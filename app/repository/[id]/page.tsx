
import type { Metadata } from "next";
import ResourceDetailView from "@/components/views/ResourceDetailView";
import { resources } from "@/lib/mock-data";

export function generateStaticParams() {
  return resources.map((r) => ({ id: r.id }));
}

export const metadata: Metadata = { title: "Resource" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ResourceDetailView id={id} />;
}
