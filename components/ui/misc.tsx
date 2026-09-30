
"use client";

import { Loader2, SearchX } from "lucide-react";
import type { ReactNode } from "react";

export function Spinner({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-muted" role="status" aria-live="polite">
      <Loader2 className="h-5 w-5 animate-spin text-accent" />
      <span className="text-sm">{label}...</span>
    </div>
  );
}

export function EmptyState({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="rounded-full border border-line bg-panel p-4 text-accent">
        <SearchX className="h-6 w-6" />
      </div>
      <p className="font-semibold text-primary">{title}</p>
      {sub && <p className="max-w-sm text-sm text-muted">{sub}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={className} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-panel">
        <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 transition-all duration-500" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </div>
  );
}

export function GradientThumb({ color, label, icon, className }: { color: string; label: string; icon?: ReactNode; className?: string }) {
  return (
    <div
      aria-label={label}
      role="img"
      className={`relative flex items-center justify-center bg-gradient-to-br ${color} ${className ?? ""}`}
    >
      <div className="absolute inset-0 bg-polar-950/30" />
      {icon && <div className="relative text-white/80">{icon}</div>}
    </div>
  );
}
