import { createClient } from "@supabase/supabase-js";

// Server-side client (no storage)
export const supabaseServer = createClient(
	import.meta.env.PUBLIC_SUPABASE_URL,
	import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
	{
		auth: {
			persistSession: false,
		},
	}
);

// Client-side Supabase instance (cookies only)
export const createBrowserClient = () => {
	if (typeof window === "undefined") {
		return supabaseServer;
	}

	return createClient(
		import.meta.env.PUBLIC_SUPABASE_URL,
		import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
		{
			auth: {
				persistSession: false, // Don't use localStorage
				autoRefreshToken: true,
				detectSessionInUrl: false,
			},
		}
	);
};

// Export a default client that's safe to use anywhere
export const supabase =
	typeof window === "undefined" ? supabaseServer : createBrowserClient();
