import { atom } from "nanostores";
import type { User } from "@supabase/supabase-js";
import { createBrowserClient } from "../supabase";

export const currentUser = atom<User | null>(null);
export const isLoading = atom(true);

export async function initAuth() {
	if (typeof window === "undefined") return;

	const supabase = createBrowserClient();

	try {
		const {
			data: { session },
		} = await supabase.auth.getSession();
		currentUser.set(session?.user || null);
	} catch (error) {
		console.error("Error initializing auth:", error);
	} finally {
		isLoading.set(false);
	}
}

// Only set up listener in browser
if (typeof window !== "undefined") {
	const supabase = createBrowserClient();
	supabase.auth.onAuthStateChange((_event, session) => {
		currentUser.set(session?.user || null);
	});
}

export async function logout() {
	const supabase = createBrowserClient();
	try {
		// Clear auth store first
		currentUser.set(null);

		// Sign out from Supabase
		await supabase.auth.signOut({ scope: "global" });

		// Make a server request to clear session
		const response = await fetch("/api/auth/logout", {
			method: "POST",
			credentials: "include",
		});

		if (!response.ok) {
			throw new Error("Logout failed");
		}

		// Force a clean reload to login
		window.location.replace("/login");
		window.location.reload(true);
	} catch (error) {
		console.error("Error logging out:", error);
		// Force reload even on error
		window.location.replace("/login");
		window.location.reload(true);
	}
}
