
import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

export function Panel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("glass rounded-2xl", className)} {...props} />;
}

export function SectionHead({
  eyebrow, title, sub, center, action,
}: { eyebrow?: string; title: string; sub?: string; center?: boolean; action?: ReactNode }) {
  return (
    <div className={cn("mb-8 flex flex-wrap items-end justify-between gap-4", center && "flex-col items-center text-center")}>
      <div className={cn("max-w-2xl", center && "flex flex-col items-center")}>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">{eyebrow}</p>
        )}
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">{title}</h2>
        {sub && <p className="mt-2 text-muted text-sm md:text-base leading-relaxed">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-line bg-panel px-2.5 py-0.5 text-[11px] font-medium text-muted",
        className
      )}
      {...props}
    />
  );
}

export function StatCard({ label, value, icon }: { label: string; value: string; icon?: ReactNode }) {
  return (
    <Panel className="p-5 flex items-center gap-4">
      {icon && <div className="text-accent shrink-0">{icon}</div>}
      <div>
        <div className="text-2xl font-bold text-primary leading-none">{value}</div>
        <div className="text-xs text-muted mt-1.5">{label}</div>
      </div>
    </Panel>
  );
}
