
import type { ChatMessage } from "@/lib/types";
import { resources, expeditions, stations, educationModules } from "@/lib/mock-data";

export interface AiAnswer {
  answer: string;
  sources: { id: string; title: string; year?: number }[];
}

const norm = (s: string) => s.toLowerCase();

function retrieval(q: string, type?: "publication" | "dataset" | "expedition-report") {
  const terms = norm(q).split(/[^a-z0-9]+/).filter((t) => t.length > 2);
  const pool = resources.filter((r) => (type ? r.type === type : true));
  return pool
    .map((r) => {
      const hay = norm(r.title + " " + r.abstract + " " + r.keywords.join(" ") + " " + r.domain + " " + r.region + " " + (r.expedition ?? ""));
      let s = 0;
      for (const t of terms) if (hay.includes(t)) s += 1;
      if (norm(q).includes(norm(r.domain))) s += 4;
      return { r, s };
    })
    .filter((o) => o.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((o) => o.r);
}

function bulletsFrom(matches: typeof resources, max = 3): string {
  return matches
    .slice(0, max)
    .map((r) => `- **${r.title}** (${r.year}): ${r.abstract.split(". ").slice(0, 1).join(". ")}.`)
    .join("\n");
}

function toSources(matches: typeof resources): AiAnswer["sources"] {
  return matches.slice(0, 3).map((r) => ({ id: r.id, title: r.title, year: r.year }));
}

export function askPolarAI(question: string): AiAnswer {
  const q = norm(question);

  // Intent: purpose of Antarctic expeditions
  if (q.includes("purpose") || (q.includes("why") && q.includes("expedition")) || q.includes("objective")) {
    const matches = retrieval("Antarctic expedition objectives mission", "expedition-report");
    const exp = expeditions[expeditions.length - 1];
    return {
      answer:
        `India's Antarctic expeditions serve science, sovereignty and stewardship.\n\n` +
        `1. **Long-term climate observation** — maintaining 30+ continuous data series on ice, ocean, atmosphere and ecosystems.\n` +
        `2. **Frontier research** — each season runs 40+ projects in glaciology, oceanography, atmospheric science, biology and geology.\n` +
        `3. **Logistics and capability** — sustaining two year-round stations, Maitri and Bharati, through annual resupply traverses.\n` +
        `4. **Global responsibility** — contributing Indian-sector data to international assessments like the IPCC.\n\n` +
        `For example, the ${exp.name} (${exp.season}) fielded ${exp.teamSize} members across objectives including: ${exp.objectives.slice(0, 2).join("; ").toLowerCase()}.\n\n` +
        bulletsFrom(matches, 2),
      sources: toSources(matches),
    };
  }

  // Intent: explain station for a student
  const stationHit = stations.find((s) => q.includes(s.name.toLowerCase()));
  if (stationHit && (q.includes("student") || q.includes("explain") || q.includes("class") || q.includes("what"))) {
    const simple = q.includes("class 6") || q.includes("class 7") || q.includes("class 8");
    const matches = retrieval(stationHit.name);
    return {
      answer:
        `Imagine a small, super-strong town built on ice, where scientists live for a whole year — that's **${stationHit.name}**!\n\n` +
        (simple
          ? `It is India's ${stationHit.region === "Arctic" ? "Arctic" : "Antarctic"} research station${stationHit.country ? ` in ${stationHit.country}` : ""}, established in ${stationHit.established}. `
          : `Established in ${stationHit.established}, ${stationHit.name} is ${stationHit.purpose} `) +
        `Here, researchers study ${stationHit.researchAreas[0].toLowerCase()} and ${stationHit.researchAreas[1]?.toLowerCase() ?? "more"}.\n\n` +
        `**Fun fact:** ${stationHit.currentActivities[0]}.\n\n` +
        bulletsFrom(matches, 2),
      sources: toSources(matches),
    };
  }

  // Intent: publications about X
  const pubMatch = q.match(/publications? (?:about|on) ([a-z ]+)/);
  if (pubMatch) {
    const topic = pubMatch[1].trim();
    const matches = retrieval(topic, "publication");
    if (matches.length) {
      return {
        answer:
          `Here are the publications in the DHRUV GYAN repository on **${topic}**:\n\n` +
          matches.slice(0, 5).map((r, i) => `${i + 1}. ${r.title} — ${r.authors.join(", ")} (${r.year})`).join("\n") +
          `\n\nOpen any of these from the Knowledge Repository for the full abstract, citation and download.`,
        sources: toSources(matches),
      };
    }
  }

  // Intent: ice loss / climate effects
  if ((q.includes("ice loss") || q.includes("ice melt") || q.includes("melting") || q.includes("sea level")) && (q.includes("effect") || q.includes("impact") || q.includes("consequence") || q.includes("what"))) {
    const matches = retrieval("ice sheet mass balance sea level climate change");
    return {
      answer:
        `Polar ice loss affects the whole planet in several connected ways:\n\n` +
        `1. **Sea-level rise** — melting land ice (Antarctica, Greenland) directly raises sea level; the East Antarctic Ice Sheet alone holds ~58 m equivalent.\n` +
        `2. **Faster warming** — loss of reflective sea ice exposes dark ocean, absorbing more heat (the ice-albedo feedback).\n` +
        `3. **Ocean circulation** — fresh meltwater can slow the sinking of cold, salty water that drives global currents.\n` +
        `4. **Ecosystems** — species timed to sea ice, like emperor penguins and krill, face breeding and feeding disruption.\n` +
        `5. **Monsoon links** — polar changes can shift atmospheric patterns that influence the Indian monsoon.\n\n` +
        bulletsFrom(matches, 2),
      sources: toSources(matches),
    };
  }

  // Intent: research in Antarctica
  if (q.includes("what research") || q.includes("what science") || q.includes("studied in antarctica")) {
    const matches = retrieval("Antarctica research", "publication");
    return {
      answer:
        `Indian teams study Antarctica across six major disciplines:\n\n` +
        `- **Glaciology** — ice-sheet mass balance and outlet-glacier dynamics (e.g., ${matches.find((m) => m.domain === "Glaciology")?.title ?? "satellite altimetry studies"}).\n` +
        `- **Oceanography** — carbon uptake and circulation in Prydz Bay and the Southern Ocean.\n` +
        `- **Atmospheric science** — some of the cleanest-air aerosol baselines on Earth.\n` +
        `- **Climate science** — ice-sheet mass balance under warming.\n` +
        `- **Biology** — krill, penguins and the polar food web.\n` +
        `- **Geology** — reading Gondwana's history in exposed rock oases.\n\n` +
        bulletsFrom(matches, 2),
      sources: toSources(matches),
    };
  }

  // Intent: education / learning
  if (q.includes("learn") || q.includes("quiz") || q.includes("study") || q.includes("teach")) {
    const mods = educationModules.filter((m) => q.includes(m.topic.toLowerCase()) || q.length > 0).slice(0, 4);
    return {
      answer:
        `The Polar Learning Hub has structured modules you can start right now:\n\n` +
        mods.map((m) => `- **${m.title}** (${m.audience}, ${m.level}): ${m.description}`).join("\n") +
        `\n\nEach module has progressive lessons, checkpoints and a companion quiz. Your progress is saved on this device.`,
      sources: mods.map((m) => ({ id: m.id, title: m.title })),
    };
  }

  // Generic retrieval fallback
  const matches = retrieval(question);
  if (matches.length) {
    return {
      answer:
        `Here's what the DHRUV GYAN repository holds on that:\n\n` +
        bulletsFrom(matches, 3) +
        `\n\nYou can open the full records from the Knowledge Repository, or ask me a follow-up like "explain this for a Class 8 student".`,
      sources: toSources(matches),
    };
  }

  return {
    answer:
      `I couldn't find a strong match in the current repository for that. Try asking about:\n\n` +
      `- An expedition, station or region (e.g., "Bharati station")\n` +
      `- A scientific domain (e.g., "publications about glaciology")\n` +
      `- A concept (e.g., "effects of polar ice loss")\n` +
      `- Learning (e.g., "quiz me on Antarctica")`,
    sources: [],
  };
}

export const AI_SUGGESTIONS = [
  "What is the purpose of India's Antarctic expeditions?",
  "Explain Maitri station for a Class 8 student.",
  "What research is being conducted in Antarctica?",
  "What are the effects of polar ice loss?",
  "Show me publications about glaciology.",
];

export const AI_GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Namaste! I am **POLAR AI**, your guide to India's polar science in DHRUV GYAN. I answer from the portal's repository — every response includes its sources.\n\nTry one of the suggested questions below.",
};
