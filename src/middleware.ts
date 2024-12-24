import { defineMiddleware } from "astro:middleware";
import { supabaseServer } from "./lib/supabase";

export const onRequest = defineMiddleware(
	async ({ locals, request, redirect }, next) => {
		// Use the server-side client
		locals.supabase = supabaseServer;

		// Get cookies from request
		const cookies = request.headers.get("cookie") || "";
		const accessToken = cookies.match(/sb-access-token=([^;]+)/)?.[1];
		const refreshToken = cookies.match(/sb-refresh-token=([^;]+)/)?.[1];

		console.log("Tokens from cookies:", {
			accessToken: !!accessToken,
			refreshToken: !!refreshToken,
		});

		let session = null;

		if (accessToken && refreshToken) {
			// Try to restore session from tokens
			const { data, error } = await supabaseServer.auth.setSession({
				access_token: accessToken,
				refresh_token: refreshToken,
			});

			if (!error) {
				session = data.session;
			} else {
				console.log("Session restore error:", error.message);
			}
		}

		if (!session) {
			// Try to get session normally
			const {
				data: { session: newSession },
			} = await supabaseServer.auth.getSession();
			session = newSession;
		}

		console.log("Current session:", {
			exists: !!session,
			email: session?.user?.email,
			path: request.url,
		});

		const url = new URL(request.url);
		const isAdminRoute = url.pathname.startsWith("/admin");
		const isLoginRoute = url.pathname === "/login";

		if (session) {
			if (isLoginRoute) {
				console.log("Redirecting logged-in user from login to admin");
				return redirect("/admin");
			}

			if (isAdminRoute) {
				const { data: profile } = await supabaseServer
					.from("profiles")
					.select("role")
					.eq("id", session.user.id)
					.single();

				console.log("Admin check:", {
					userId: session.user.id,
					role: profile?.role,
				});

				if (!profile || profile.role !== "admin") {
					console.log("Non-admin access attempt");
					return redirect("/");
				}
			}
		} else if (isAdminRoute) {
			console.log("Unauthenticated admin access attempt");
			return redirect("/login");
		}

		const response = await next();

		// Always update cookies if we have a session
		if (session) {
			// Set each cookie separately
			response.headers.append(
				"Set-Cookie",
				`sb-access-token=${session.access_token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`
			);
			response.headers.append(
				"Set-Cookie",
				`sb-refresh-token=${session.refresh_token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`
			);
		}

		return response;
	}
);
