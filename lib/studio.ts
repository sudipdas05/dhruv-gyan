
import type { AiDraft } from "@/lib/types";

export const CONTENT_TYPES = ["Website article", "Instagram caption", "Facebook post", "X post", "LinkedIn post", "YouTube description", "Newsletter", "Press release"] as const;
export const TONES = ["Scientific", "Educational", "Public-friendly", "Professional"] as const;
export const LANGUAGES = ["English", "Hindi", "Bengali"] as const;

export interface StudioInput {
  sourceId: string;
  sourceTitle: string;
  sourceType: string;
  sourceAbstract: string;
  contentType: string;
  tone: string;
  language: string;
}

export interface StudioOutput {
  title: string;
  summary: string;
  body: string;
  caption: string;
  hashtags: string[];
}

const HOOKS: Record<string, Record<string, string>> = {
  English: {
    Scientific: "New findings from India's polar programme",
    Educational: "Did you know? Polar science explains our weather",
    "Public-friendly": "What India's scientists are doing at the bottom of the world",
    Professional: "Update from the National Centre for Polar and Ocean Research",
  },
  Hindi: {
    Scientific: "भारत के ध्रुवीय अभियान से नए वैज्ञानिक निष्कर्ष",
    Educational: "क्या आप जानते हैं? ध्रुवीय विज्ञान हमारे मौसम को समझाता है",
    "Public-friendly": "धरती के दक्षिणी छोर पर भारत के वैज्ञानिक क्या कर रहे हैं",
    Professional: "राष्ट्रीय ध्रुवीय एवं समुद्री अनुसंधान केंद्र से अपडेट",
  },
  Bengali: {
    Scientific: "ভারতের মেরু গবেষণা অভিযান থেকে নতুন তথ্য",
    Educational: "জানেন কি? মেরু বিজ্ঞান আমাদের আবহাওয়া বোঝায়",
    "Public-friendly": "পৃথিবীর দক্ষিণ প্রান্তে ভারতের বিজ্ঞানীরা কী করছেন",
    Professional: "ন্যাশনাল সেন্টার ফর পোলার অ্যান্ড ওশান রিসার্চ থেকে আপডেট",
  },
};

const CTAS: Record<string, string> = {
  English: "Follow DHRUV GYAN for more from India's polar science.",
  Hindi: "भारत के ध्रुवीय विज्ञान की और खबरों के लिए DHRUV GYAN को फॉलो करें।",
  Bengali: "ভারতের মেরু বিজ্ঞানের আরও খবরের জন্য DHRUV GYAN-কে ফলো করুন।",
};

function hashtags(domain: string, tone: string): string[] {
  const base = ["DhruvGyan", "NCPOR", "PolarScience", "MoES"];
  const dom = domain.split(" ")[0].replace(/[^A-Za-z]/g, "");
  if (tone === "Educational") base.push("PolarClassroom");
  if (dom) base.push(dom);
  return base;
}

export function generateContent(input: StudioInput, variant = 0): StudioOutput {
  const { sourceTitle, sourceAbstract, contentType, tone, language } = input;
  const hook = HOOKS[language]?.[tone] ?? HOOKS.English[tone as keyof typeof HOOKS.English] ?? HOOKS.English["Public-friendly"];
  const cta = CTAS[language] ?? CTAS.English;
  const firstSentence = sourceAbstract.split(". ")[0] + ".";
  const tags = hashtags(input.sourceType, tone);
  const tagline = tags.map((t) => "#" + t).join(" ");

  const title =
    contentType === "Instagram caption" || contentType === "X post"
      ? hook
      : `${hook}: ${sourceTitle.length > 72 ? sourceTitle.slice(0, 69) + "..." : sourceTitle}`;

  const summary = firstSentence;

  let body = "";
  let caption = "";

  switch (contentType) {
    case "Website article":
      body = `${title}\n\n${firstSentence}\n\n${sourceAbstract}\n\nWhy this matters\n${firstSentence.replace(/\.$/, "")} — and it is part of India's long-term commitment to understanding the polar regions that regulate our planet's climate.\n\n${language === "English" ? "Read the full record in the DHRUV GYAN Knowledge Repository." : "पूरी जानकारी DHRUV GYAN Knowledge Repository में उपलब्ध है।"}`;
      break;
    case "Press release":
      body = `FOR IMMEDIATE RELEASE\n\n${title}\n\nGoa — ${firstSentence}\n\n${sourceAbstract}\n\nAbout NCPOR\nThe National Centre for Polar and Ocean Research, under the Ministry of Earth Sciences, leads India's polar and ocean research programmes.\n\nMedia contact: outreach@ncpor.demo`;
      break;
    case "Newsletter":
      body = `POLAR POST — this week in Indian polar science\n\n${title}\n\n${sourceAbstract}\n\nAlso in this issue: expedition updates, new datasets and learning resources from the Polar Learning Hub.\n\n${cta}`;
      break;
    case "YouTube description":
      body = `${sourceTitle}\n\n${firstSentence}\n\n${summary}\n\nChapters\n00:00 Introduction\n02:10 Field operations\n05:30 Results and findings\n\n${tagline}\n\n${cta}`;
      break;
    default:
      body = `${hook}\n\n${firstSentence}\n\n${sourceAbstract.slice(0, 220)}...\n\n${cta}`;
  }

  switch (contentType) {
    case "Instagram caption":
      caption = `${hook}\n\n${summary}\n\nSwipe to explore what this means for India's polar science. ${tagline}\n\n${cta}`;
      break;
    case "X post":
      caption = `${hook}: ${firstSentence} ${tagline}`;
      break;
    case "Facebook post":
    case "LinkedIn post":
      caption = `${hook}\n\n${summary}\n\n${sourceAbstract.slice(0, 180)}...\n\n${tagline}\n\n${cta}`;
      break;
    default:
      caption = body.split("\n\n").slice(0, 3).join("\n\n");
  }

  if (variant > 0) {
    caption += variant === 1 ? `\n\n(Alternative angle: the people behind the science.)` : `\n\n(Alternative angle: what this means for the Indian monsoon.)`;
  }

  return { title, summary, body, caption, hashtags: tags };
}

export function draftFromOutput(input: StudioInput, out: StudioOutput): Omit<AiDraft, "id" | "createdAt"> {
  return {
    sourceTitle: input.sourceTitle,
    contentType: input.contentType,
    tone: input.tone,
    language: input.language,
    title: out.title,
    body: out.body,
    caption: out.caption,
    hashtags: out.hashtags,
    status: "draft",
  };
}
