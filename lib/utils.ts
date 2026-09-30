
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const TYPE_LABELS: Record<string, string> = {
  publication: "Publication",
  "expedition-report": "Expedition Report",
  dataset: "Dataset",
  photo: "Photograph",
  video: "Video",
  education: "Educational Resource",
  activity: "Institutional Activity",
};

export const REGION_COLORS: Record<string, string> = {
  Arctic: "from-cyan-400 to-blue-600",
  Antarctica: "from-sky-400 to-indigo-600",
  Himalaya: "from-teal-400 to-cyan-600",
  "Southern Ocean": "from-blue-400 to-slate-600",
};

export function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K+";
  return String(n);
}
