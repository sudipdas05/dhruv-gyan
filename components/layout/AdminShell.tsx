
"use client";

import { BookOpen, Bot, Database, FolderOpen, Gauge, Globe2, Image, LogOut, Newspaper, GraduationCap, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getSession, setSession, isStaff } from "@/lib/store";
import type { SessionUser } from "@/lib/types";
import { Spinner } from "@/components/ui/misc";

const ITEMS = [
  { href: "/admin", label: "Dashboard", icon: Gauge },
  { href: "/admin/resources", label: "Repository", icon: FolderOpen },
  { href: "/admin/content", label: "AI Content", icon: Bot },
  { href: "/admin/media", label: "Media", icon: Image },
  { href: "/studio", label: "Media Studio", icon: Sparkles },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/explore", label: "Globe", icon: Globe2 },
  { href: "/education", label: "Education", icon: GraduationCap },
  { href: "/repository", label: "Public Site", icon: BookOpen },
];

export default function AdminShell({ children, title }: { children: React.ReactNode; title: string }) {
  const [session, setSessionState] = useState<SessionUser | null | undefined>(undefined);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const s = getSession();
    if (!s || !isStaff(s.role)) {
      router.replace(`/login?next=${encodeURIComponent(pathname || "/admin")}`);
      setSessionState(null);
    } else {
      setSessionState(s);
    }
  }, [router, pathname]);

  if (session === undefined) return <Spinner label="Checking access" />;
  if (!session) return <Spinner label="Redirecting to login" />;

  return (
    <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 md:px-6">
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="glass sticky top-24 rounded-2xl p-3">
          <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Admin Portal</p>
          <nav className="flex flex-col gap-0.5" aria-label="Admin">
            {ITEMS.map((i) => {
              const active = pathname === i.href;
              return (
                <Link
                  key={i.href}
                  href={i.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors focus-ring",
                    active ? "bg-cyan-500/15 text-accent" : "text-muted hover:text-primary hover:bg-cyan-500/5"
                  )}
                >
                  <i.icon className="h-4 w-4" /> {i.label}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={() => { setSession(null); router.push("/"); }}
            className="mt-2 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-muted hover:text-rose-300 hover:bg-rose-500/10 focus-ring"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
          <p className="mt-2 border-t border-line px-2 pt-2 text-[10px] text-muted">
            Signed in as <span className="text-accent">{session.role}</span> (demo auth)
          </p>
        </div>
      </aside>
      <section className="min-w-0 flex-1">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 lg:hidden">
          <h1 className="text-xl font-bold text-primary">{title}</h1>
          <button onClick={() => { setSession(null); router.push("/"); }} className="text-xs text-muted underline">Logout</button>
        </div>
        <div className="hidden lg:block mb-6">
          <h1 className="text-2xl font-bold text-primary">{title}</h1>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
            <Database className="h-3.5 w-3.5" /> Demo data store — changes persist in this browser via localStorage
          </p>
        </div>
        {children}
      </section>
    </div>
  );
}
