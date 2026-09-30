
import type { Metadata } from "next";
import AdminShell from "@/components/layout/AdminShell";
import MediaView from "@/components/views/MediaView";
import { Panel } from "@/components/ui/card";
export const metadata: Metadata = { title: "Media Management" };
export default function Page() {
  return <AdminShell title="Media Management">
    <Panel className="mb-5 p-3 text-xs text-muted">Public gallery view — drag-and-drop upload UI connects to Supabase Storage in production.</Panel>
    <MediaView />
  </AdminShell>;
}
