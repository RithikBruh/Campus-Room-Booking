import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl : string | undefined  = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey : string | undefined = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY environment variables')
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export default supabase