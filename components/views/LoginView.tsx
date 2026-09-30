
"use client";

import { KeyRound, LogIn, ShieldAlert } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DEMO_ACCOUNTS, setSession } from "@/lib/store";
import { Panel } from "@/components/ui/card";
import { Input, Field } from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function LoginView() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (accountEmail?: string) => {
    const acc = DEMO_ACCOUNTS.find((a) => a.email === accountEmail);
    const user = acc ?? { name: email.split("@")[0] || "Guest User", email: email || "guest@dhruvgyan.demo", role: "public" as const };
    setSession(user);
    const raw = params.get("next");
    const next = raw && raw.startsWith("/") && !raw.startsWith("//") ? raw : null;
    router.push(next ?? (user.role === "admin" || user.role === "editor" ? "/admin" : "/"));
  };

  return (
    <div className="mx-auto max-w-md px-4 py-14 md:px-6">
      <Panel className="p-6 md:p-8">
        <div className="mb-2 flex items-center gap-2 text-amber-300">
          <ShieldAlert className="h-4 w-4" />
          <p className="text-[11px] font-semibold uppercase tracking-wider">Demo Authentication — Supabase Auth when configured</p>
        </div>
        <h1 className="text-2xl font-bold text-primary">Sign in to DHRUV GYAN</h1>
        <p className="mt-1 text-sm text-muted">Use a demo account or any email to enter as a public user.</p>
        <form onSubmit={(e) => { e.preventDefault(); login(); }} className="mt-6 space-y-4">
          <Field label="Email"><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.in" autoComplete="email" /></Field>
          <Field label="Password"><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" /></Field>
          <Button type="submit" className="w-full"><LogIn className="h-4 w-4" /> Sign in</Button>
        </form>
        <div className="mt-6 border-t border-line pt-5">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent"><KeyRound className="h-3.5 w-3.5" /> One-click demo accounts</p>
          <div className="grid gap-2">
            {DEMO_ACCOUNTS.map((a) => (
              <button key={a.email} onClick={() => login(a.email)}
                className="flex items-center justify-between rounded-xl border border-line bg-input px-4 py-2.5 text-left text-sm transition-colors hover:border-cyan-400/50 focus-ring">
                <span className="text-primary">{a.name} <span className="text-muted">· {a.role}</span></span>
                <span className="text-[11px] text-muted">{a.email}</span>
              </button>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}
