
import { Suspense } from "react";
import type { Metadata } from "next";
import ExploreView from "@/components/views/ExploreView";
import { Spinner } from "@/components/ui/misc";

export const metadata: Metadata = { title: "Explore the Polar Globe" };

export default function Page() {
  return <Suspense fallback={<Spinner />}><ExploreView /></Suspense>;
}
