
// ---- DHRUV GYAN shared types ----

export type Role = "public" | "student" | "teacher" | "researcher" | "editor" | "admin";

export type Region = "Arctic" | "Antarctica" | "Himalaya" | "Southern Ocean";

export type ContentType =
  | "publication"
  | "expedition-report"
  | "dataset"
  | "photo"
  | "video"
  | "education"
  | "activity";

export type Domain =
  | "Atmospheric Science"
  | "Glaciology"
  | "Oceanography"
  | "Climate Science"
  | "Marine Biology"
  | "Geology"
  | "Earth Observation"
  | "Meteorology"
  | "Polar Ecology"
  | "Human Biology"
  | "Education & Outreach";

export type Language = "English" | "Hindi";

export interface Resource {
  id: string;
  title: string;
  type: ContentType;
  year: number;
  authors: string[];
  region: Region;
  domain: Domain;
  abstract: string;
  keywords: string[];
  tags: string[];
  expedition?: string;
  language: Language;
  citation: string;
  views: number;
  downloads: number;
  published: boolean;
  keyPoints: string[];
  fileSize?: string;
  doi?: string;
  mediaId?: string;
  moduleId?: string;
}

export interface Station {
  id: string;
  name: string;
  region: Region;
  country?: string;
  lat: number;
  lon: number;
  established: number;
  purpose: string;
  researchAreas: string[];
  currentActivities: string[];
  expeditions: string[];
  relatedResources: string[];
  color: string;
}

export interface Expedition {
  id: string;
  name: string;
  season: string;
  year: number;
  region: Region;
  station: string;
  leader: string;
  teamSize: number;
  description: string;
  objectives: string[];
  researchAreas: string[];
  reports: string[];
  publications: string[];
  ongoing: boolean;
}

export type MediaKind = "photo" | "video" | "infographic" | "audio" | "press";

export interface MediaAsset {
  id: string;
  kind: MediaKind;
  title: string;
  date: string;
  location: string;
  expedition: string;
  tags: string[];
  credit: string;
  description: string;
  color: string;
  duration?: string;
  featured?: boolean;
}

export interface LessonSection {
  heading: string;
  body: string;
}

export interface Lesson {
  id: string;
  title: string;
  sections: LessonSection[];
  concepts: string[];
}

export interface EducationModule {
  id: string;
  topic: string;
  title: string;
  audience: string;
  level: string;
  description: string;
  color: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface NewsItem {
  id: string;
  date: string;
  category: "Expedition Updates" | "Research" | "Institutional News" | "Events" | "Announcements" | "Education";
  title: string;
  excerpt: string;
  body: string;
  color: string;
}

export type DraftStatus = "draft" | "in-review" | "approved" | "published" | "rejected";

export interface AiDraft {
  id: string;
  sourceTitle: string;
  contentType: string;
  tone: string;
  language: string;
  title: string;
  body: string;
  caption: string;
  hashtags: string[];
  status: DraftStatus;
  createdAt: string;
}

export interface SessionUser {
  name: string;
  email: string;
  role: Role;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  sources?: { id: string; title: string; year?: number }[];
}
