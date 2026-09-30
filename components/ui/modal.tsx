
"use client";

import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Modal({
  open, onClose, title, children, wide,
}: { open: boolean; onClose: () => void; title: string; children: ReactNode; wide?: boolean }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-polar-950/70 backdrop-blur-sm" onClick={onClose} />
      <div className={cn("relative glass rounded-2xl w-full max-h-[85vh] overflow-y-auto animate-fadeUp", wide ? "max-w-3xl" : "max-w-lg")}>
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-solid backdrop-blur px-5 py-3.5 rounded-t-2xl">
          <h3 className="font-semibold text-primary text-sm md:text-base">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-md p-1.5 text-muted hover:text-primary hover:bg-cyan-500/10 focus-ring"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
