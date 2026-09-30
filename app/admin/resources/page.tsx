
import type { Metadata } from "next";
import AdminShell from "@/components/layout/AdminShell";
import AdminResourcesView from "@/components/views/AdminResourcesView";
export const metadata: Metadata = { title: "Resource Management" };
export default function Page() {
  return <AdminShell title="Repository Management"><AdminResourcesView /></AdminShell>;
}
