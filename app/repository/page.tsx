
import { Suspense } from "react";
import type { Metadata } from "next";
import RepositoryView from "@/components/views/RepositoryView";
import { Spinner } from "@/components/ui/misc";

export const metadata: Metadata = { title: "Knowledge Repository" };

export default function Page() {
  return <Suspense fallback={<Spinner />}><RepositoryView /></Suspense>;
}
