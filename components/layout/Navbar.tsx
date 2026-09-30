
"use client";

import { Bot, Compass, LogIn, Menu, Moon, Search, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getSession, setSession } from "@/lib/store";
import type { SessionUser } from "@/lib/types";
import Button from "@/components/ui/button";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/repository", label: "Knowledge Repository" },
  { href: "/expeditions", label: "Expeditions" },
  { href: "/education", label: "Education" },
  { href: "/media", label: "Media" },
  { href: "/news", label: "News & Activities" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [session, setSessionState] = useState<SessionUser | null>(null);
  const [dark, setDark] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const read = () => setSessionState(getSession());
    read();
    window.addEventListener("dg:session", read);
    return () => window.removeEventListener("dg:session", read);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    setDark(!document.documentElement.classList.contains("light"));
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("light", !next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("dg_theme", next ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-line">
      <nav className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:px-6" aria-label="Main">
        <Link href="/" className="flex items-center gap-2.5 focus-ring rounded-lg" aria-label="DHRUV GYAN home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 text-polar-950">
            <Compass className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-wide text-primary">DHRUV GYAN</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-muted">NCPOR • MoES</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1 ml-6">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-lg px-3 py-2 text-[13px] font-medium transition-colors focus-ring",
                pathname === l.href ? "text-accent bg-cyan-500/10" : "text-muted hover:text-primary"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden md:inline-flex items-center rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-300" title="Running with demonstration data and mock AI">
            Demo Mode
          </span>
          <button
            onClick={() => router.push("/repository")}
            aria-label="Search the repository"
            className="rounded-lg p-2 text-muted hover:text-accent hover:bg-cyan-500/10 focus-ring"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <Button size="sm" variant="soft" onClick={() => router.push("/ai")} className="hidden sm:inline-flex">
            <Bot className="h-3.5 w-3.5" /> POLAR AI
          </Button>
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark / light theme"
            className="rounded-lg p-2 text-muted hover:text-accent hover:bg-cyan-500/10 focus-ring"
          >
            {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>
          {session ? (
            <div className="hidden sm:flex items-center gap-2">
              <span className="rounded-lg border border-line bg-panel px-2.5 py-1.5 text-xs text-primary" title={session.email}>
                {session.name.split(" ")[0]} · <span className="text-accent">{session.role}</span>
              </span>
              <Button size="sm" variant="ghost" onClick={() => setSession(null)}>Logout</Button>
            </div>
          ) : (
            <Button size="sm" variant="ghost" onClick={() => router.push("/login")} className="hidden sm:inline-flex">
              <LogIn className="h-3.5 w-3.5" /> Login
            </Button>
          )}
          <button
            className="rounded-lg p-2 text-muted hover:text-primary lg:hidden focus-ring"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium focus-ring",
                  pathname === l.href ? "text-accent bg-cyan-500/10" : "text-muted hover:text-primary"
                )}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2 border-t border-line pt-3">
              <Button size="sm" variant="soft" onClick={() => router.push("/ai")}>
                <Bot className="h-3.5 w-3.5" /> Ask POLAR AI
              </Button>
              {session ? (
                <Button size="sm" variant="ghost" onClick={() => setSession(null)}>Logout ({session.role})</Button>
              ) : (
                <Button size="sm" variant="ghost" onClick={() => router.push("/login")}>Login</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
