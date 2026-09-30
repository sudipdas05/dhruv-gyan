
import type { Metadata } from "next";
import NewsView from "@/components/views/NewsView";
export const metadata: Metadata = { title: "News & Activities" };
export default function Page() { return <NewsView />; }
