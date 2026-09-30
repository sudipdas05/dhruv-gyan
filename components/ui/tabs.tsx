
"use client";

import { cn } from "@/lib/utils";

export interface TabDef { id: string; label: string; count?: number }

export default function Tabs({ tabs, active, onChange, className }: {
  tabs: TabDef[]; active: string; onChange: (id: string) => void; className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)} role="tablist">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={active === t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-xs font-medium border transition-colors focus-ring",
            active === t.id
              ? "border-cyan-400/70 bg-cyan-500/15 text-accent"
              : "border-line text-muted hover:text-primary hover:border-cyan-400/40"
          )}
        >
          {t.label}
          {typeof t.count === "number" && (
            <span className="ml-1.5 rounded-full bg-panel px-1.5 py-0.5 text-[10px]">{t.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}
