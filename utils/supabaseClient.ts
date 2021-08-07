import { createClient } from '@supabase/supabase-js'

//TODO: Add errors if either of these are not present
const supabaseUrl = process.env.SUPABASE_URL ?? ""
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)