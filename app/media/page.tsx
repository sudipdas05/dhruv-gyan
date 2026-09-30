
import { Suspense } from "react";
import type { Metadata } from "next";
import MediaView from "@/components/views/MediaView";
import { Spinner } from "@/components/ui/misc";
export const metadata: Metadata = { title: "Media Hub" };
export default function Page() { return <Suspense fallback={<Spinner />}><MediaView /></Suspense>; }
