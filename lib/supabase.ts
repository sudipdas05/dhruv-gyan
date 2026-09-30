
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// When env vars are present, a real Supabase client is created.
// Otherwise every service in lib/ falls back to the local demo dataset,
// so the app runs 100% offline with zero configuration.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured: boolean = Boolean(url && anon);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anon as string)
  : null;
