import type { Metadata } from "next";
import NewsDetailView from "@/components/views/NewsDetailView";
import { newsItems } from "@/lib/mock-data";

export function generateStaticParams() {
  return newsItems.map((n) => ({ id: n.id }));
}

export const metadata: Metadata = { title: "News" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <NewsDetailView id={id} />;
}
