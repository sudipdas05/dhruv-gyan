
import type { Metadata } from "next";
import AdminShell from "@/components/layout/AdminShell";
import AdminContentView from "@/components/views/AdminContentView";
export const metadata: Metadata = { title: "AI Content Approval" };
export default function Page() {
  return <AdminShell title="AI Content Approval"><AdminContentView /></AdminShell>;
}
