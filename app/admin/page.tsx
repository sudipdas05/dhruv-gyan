
import type { Metadata } from "next";
import AdminShell from "@/components/layout/AdminShell";
import AdminDashboardView from "@/components/views/AdminDashboardView";
export const metadata: Metadata = { title: "Admin Dashboard" };
export default function Page() {
  return <AdminShell title="Dashboard"><AdminDashboardView /></AdminShell>;
}
