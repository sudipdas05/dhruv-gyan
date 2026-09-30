import type { MetadataRoute } from "next";
import { resources, expeditions, educationModules, newsItems } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://dhruvgyan.in";
  const routes = ["", "/explore", "/repository", "/ai", "/expeditions", "/education", "/media", "/studio", "/news", "/login"];
  const now = new Date();
  const detail = [
    ...resources.filter((r) => r.published).map((r) => `/repository/${r.id}`),
    ...expeditions.map((e) => `/expeditions/${e.id}`),
    ...educationModules.map((m) => `/education/${m.id}`),
    ...newsItems.map((n) => `/news/${n.id}`),
  ];
  return [...routes, ...detail].map((r) => ({ url: base + r, lastModified: now }));
}
