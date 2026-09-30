
import { Suspense } from "react";
import type { Metadata } from "next";
import ModuleView from "@/components/views/ModuleView";
import { educationModules } from "@/lib/mock-data";
import { Spinner } from "@/components/ui/misc";
export function generateStaticParams() { return educationModules.map((m) => ({ id: m.id })); }
export const metadata: Metadata = { title: "Learning Module" };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <Suspense fallback={<Spinner />}><ModuleView id={id} /></Suspense>;
}
