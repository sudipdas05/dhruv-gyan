
import type { Resource } from "@/lib/types";

export function apa(r: Resource): string {
  return r.citation;
}

export function ieee(r: Resource): string {
  const authors = r.authors.map((a) => a.replace("Dr. ", "")).join(", ");
  return `${authors}, "${r.title}," National Centre for Polar and Ocean Research, ${r.year}.${r.doi ? " doi: " + r.doi + "." : ""}`;
}

export function plain(r: Resource): string {
  return `${r.title} (${r.year}) — ${r.authors.join(", ")}. NCPOR Knowledge Repository.`;
}
