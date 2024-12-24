import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import { currentUser } from "../../lib/stores/authStore";
import { useStore } from "@nanostores/react";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const user = useStore(currentUser);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setIsLoading(true);

		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) throw error;

			if (data.session) {
				// Update auth store
				currentUser.set(data.session.user);

				// Make a server request to set cookies properly
				const response = await fetch("/api/auth/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						access_token: data.session.access_token,
						refresh_token: data.session.refresh_token,
					}),
					credentials: "include",
				});

				if (!response.ok) {
					throw new Error("Failed to set session");
				}

				// Add a small delay to ensure cookies are set
				await new Promise((resolve) => setTimeout(resolve, 100));

				// Navigate to admin
				window.location.replace("/admin");
			}
		} catch (err) {
			console.error("Login error:", err);
			setError(
				err instanceof Error ? err.message : "An error occurred during login"
			);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="relative"
		>
			<div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-violet-500/10 rounded-2xl blur-xl" />

			<div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
				<div className="mb-8 text-center">
					<h1 className="text-2xl font-display font-bold text-white mb-2">
						Welcome Back
					</h1>
					<p className="text-gray-400">Sign in to access your dashboard</p>
				</div>

				{error && (
					<div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-300 mb-2"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
							placeholder="you@example.com"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-300 mb-2"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
							placeholder="••••••••"
						/>
					</div>

					<motion.button
						type="submit"
						disabled={isLoading}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? "Signing in..." : "Sign In"}
					</motion.button>

					<div className="text-center">
						<a
							href="/forgot-password"
							className="text-sm text-gray-400 hover:text-white transition-colors"
						>
							Forgot your password?
						</a>
					</div>
				</form>
			</div>
		</motion.div>
	);
}
