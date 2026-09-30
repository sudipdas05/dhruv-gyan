
import type { Resource, ContentType, Region, Domain } from "@/lib/types";
import { resources } from "@/lib/mock-data";

export interface SearchFilters {
  types: ContentType[];
  years: number[];
  regions: Region[];
  domains: Domain[];
  expeditions: string[];
  authors: string[];
  languages: string[];
}

export const emptyFilters: SearchFilters = {
  types: [], years: [], regions: [], domains: [], expeditions: [], authors: [], languages: [],
};

export type SortKey = "relevance" | "newest" | "oldest" | "az";

export interface Facets {
  years: number[];
  regions: Region[];
  domains: Domain[];
  expeditions: string[];
  authors: string[];
  languages: string[];
}

const uniq = <T,>(arr: T[]): T[] => Array.from(new Set(arr));

export function getFacets(pool: Resource[]): Facets {
  return {
    years: uniq(pool.map((r) => r.year)).sort((a, b) => b - a),
    regions: uniq(pool.map((r) => r.region)),
    domains: uniq(pool.map((r) => r.domain)),
    expeditions: uniq(pool.map((r) => r.expedition).filter((x): x is string => Boolean(x))),
    authors: uniq(pool.flatMap((r) => r.authors)),
    languages: uniq(pool.map((r) => r.language)),
  };
}

function score(r: Resource, terms: string[]): number {
  if (terms.length === 0) return 1;
  let s = 0;
  const title = r.title.toLowerCase();
  const abs = r.abstract.toLowerCase();
  const kw = r.keywords.join(" ").toLowerCase() + " " + r.tags.join(" ").toLowerCase();
  const auth = r.authors.join(" ").toLowerCase();
  for (const t of terms) {
    if (title.includes(t)) s += 12;
    if (kw.includes(t)) s += 8;
    if (auth.includes(t)) s += 6;
    if (abs.includes(t)) s += 4;
    if (r.domain.toLowerCase().includes(t)) s += 5;
    if (r.region.toLowerCase().includes(t)) s += 5;
    if (r.expedition?.toLowerCase().includes(t)) s += 6;
    if (r.year.toString().includes(t)) s += 3;
  }
  return s;
}

export function searchResources(
  query: string,
  filters: SearchFilters,
  sort: SortKey,
  pool: Resource[] = resources
): Resource[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  let out = pool.filter((r) => {
    if (filters.types.length && !filters.types.includes(r.type)) return false;
    if (filters.years.length && !filters.years.includes(r.year)) return false;
    if (filters.regions.length && !filters.regions.includes(r.region)) return false;
    if (filters.domains.length && !filters.domains.includes(r.domain)) return false;
    if (filters.expeditions.length && !(r.expedition && filters.expeditions.includes(r.expedition))) return false;
    if (filters.authors.length && !r.authors.some((a) => filters.authors.includes(a))) return false;
    if (filters.languages.length && !filters.languages.includes(r.language)) return false;
    return true;
  });

  if (terms.length) out = out.filter((r) => score(r, terms) > 0);

  switch (sort) {
    case "newest": out = [...out].sort((a, b) => b.year - a.year); break;
    case "oldest": out = [...out].sort((a, b) => a.year - b.year); break;
    case "az": out = [...out].sort((a, b) => a.title.localeCompare(b.title)); break;
    default: out = [...out].sort((a, b) => score(b, terms) - score(a, terms) || b.year - a.year);
  }
  return out;
}

export function relatedResources(r: Resource, n = 4): Resource[] {
  return resources
    .filter((x) => x.id !== r.id)
    .map((x) => {
      let s = 0;
      if (x.domain === r.domain) s += 3;
      if (x.region === r.region) s += 2;
      if (x.expedition && x.expedition === r.expedition) s += 2;
      s += x.keywords.filter((k) => r.keywords.includes(k)).length;
      return { x, s };
    })
    .filter((o) => o.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, n)
    .map((o) => o.x);
}
