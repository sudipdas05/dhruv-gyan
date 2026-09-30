
import { Suspense } from "react";
import type { Metadata } from "next";
import LoginView from "@/components/views/LoginView";
import { Spinner } from "@/components/ui/misc";
export const metadata: Metadata = { title: "Login" };
export default function Page() {
  return <Suspense fallback={<Spinner />}><LoginView /></Suspense>;
}
