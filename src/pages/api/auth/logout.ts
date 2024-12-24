import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";

export const POST: APIRoute = async ({ cookies, request }) => {
	// Get the current session to invalidate it
	const {
		data: { session },
	} = await supabaseServer.auth.getSession();

	if (session) {
		// Sign out on server side
		await supabaseServer.auth.admin.signOut(session.access_token);
	}

	// Clear all cookies
	const cookieHeader = request.headers.get("cookie") || "";
	const cookies_to_remove = cookieHeader
		.split(";")
		.map((cookie) => cookie.split("=")[0].trim())
		.filter((name) => name.startsWith("sb-"));

	const clearCookies = cookies_to_remove.map(
		(name) =>
			`${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`
	);

	return new Response(null, {
		status: 200,
		headers: {
			"Set-Cookie": clearCookies,
			"Cache-Control": "no-store, max-age=0",
		},
	});
};
