
import type { Metadata } from "next";
import AdminShell from "@/components/layout/AdminShell";
import NewsView from "@/components/views/NewsView";
export const metadata: Metadata = { title: "News Management" };
export default function Page() {
  return <AdminShell title="News Management"><NewsView /></AdminShell>;
}
