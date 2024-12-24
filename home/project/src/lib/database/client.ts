import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../types/database';

// Load environment variables
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create singleton client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);