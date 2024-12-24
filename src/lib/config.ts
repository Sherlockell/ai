// Environment configuration
export const config = {
  supabase: {
    url: import.meta.env.PUBLIC_SUPABASE_URL,
    anonKey: import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  }
} as const;

// Validation
if (!config.supabase.url || !config.supabase.anonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please click "Connect to Supabase" button to configure.'
  );
}