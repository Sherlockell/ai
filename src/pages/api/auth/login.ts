import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies }) => {
	const { access_token, refresh_token } = await request.json();

	// Set session on server side
	const { data, error } = await supabaseServer.auth.setSession({
		access_token,
		refresh_token,
	});

	if (error || !data.session) {
		return new Response(JSON.stringify({ error: "Invalid session" }), {
			status: 401,
		});
	}

	// Set cookies using Astro's cookies API
	cookies.set("sb-access-token", access_token, {
		path: "/",
		httpOnly: true,
		secure: import.meta.env.PROD,
		sameSite: "lax",
		maxAge: 3600,
	});

	cookies.set("sb-refresh-token", refresh_token, {
		path: "/",
		httpOnly: true,
		secure: import.meta.env.PROD,
		sameSite: "lax",
		maxAge: 7200,
	});

	return new Response(null, {
		status: 200,
		headers: {
			"Cache-Control": "no-store, max-age=0",
		},
	});
};
