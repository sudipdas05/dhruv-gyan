
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SessionUser, Role } from "@/lib/types";

// ---------- Demo authentication (Supabase Auth when configured) ----------

export const DEMO_ACCOUNTS: SessionUser[] = [
  { name: "Dr. A. Sharma", email: "admin@dhruvgyan.demo", role: "admin" },
  { name: "Dr. R. Iyer", email: "editor@dhruvgyan.demo", role: "editor" },
  { name: "Dr. K. Menon", email: "researcher@dhruvgyan.demo", role: "researcher" },
  { name: "Anika Rao", email: "student@dhruvgyan.demo", role: "student" },
];

const SESSION_KEY = "dg_session";

export function getSession(): SessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch {
    return null;
  }
}

export function setSession(user: SessionUser | null): void {
  if (typeof window === "undefined") return;
  if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  else localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("dg:session"));
}

export function isStaff(role?: Role): boolean {
  return role === "admin" || role === "editor";
}

// ---------- Generic local-storage-backed state ----------

export function useLS<T>(key: string, fallback: T) {
  const [val, setVal] = useState<T>(fallback);
  // Always holds the latest value so `set` can compute the next state without
  // running side effects (localStorage write + event dispatch) inside a React updater.
  const latest = useRef<T>(fallback);
  const fallbackRef = useRef<T>(fallback);

  useEffect(() => {
    const read = () => {
      let next = fallbackRef.current;
      try {
        const raw = localStorage.getItem(key);
        if (raw) next = JSON.parse(raw) as T;
      } catch {
        /* corrupt or unavailable storage - use fallback */
      }
      latest.current = next;
      setVal(next);
    };
    read();
    window.addEventListener("storage", read);
    window.addEventListener("dg:" + key, read);
    return () => {
      window.removeEventListener("storage", read);
      window.removeEventListener("dg:" + key, read);
    };
  }, [key]);

  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      const next = typeof v === "function" ? (v as (p: T) => T)(latest.current) : v;
      latest.current = next;
      setVal(next);
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* storage full - ignore in demo */
      }
      // Notify other components using the same key (this component re-reads too, harmlessly).
      window.dispatchEvent(new Event("dg:" + key));
    },
    [key]
  );

  return [val, set] as const;
}

// ---------- Tiny toast system ----------

export function toast(message: string): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("dg:toast", { detail: message }));
}
