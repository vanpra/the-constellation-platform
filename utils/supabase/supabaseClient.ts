import { createClient } from "@supabase/supabase-js";

if (
  process.env.NEXT_PUBLIC_SUPABASE_URL == undefined ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY == undefined
) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set"
  );
}
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
