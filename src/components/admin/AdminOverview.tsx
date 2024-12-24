import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getPosts } from "../../lib/blog";
import type { Post } from "../../types/blog";

export default function AdminOverview() {
	const [stats, setStats] = useState({
		totalPosts: 0,
		publishedPosts: 0,
		draftPosts: 0,
	});
	const [recentPosts, setRecentPosts] = useState<Post[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		loadData();
	}, []);

	async function loadData() {
		try {
			const posts = await getPosts();
			setRecentPosts(posts.slice(0, 5)); // Get 5 most recent posts

			// Calculate stats
			setStats({
				totalPosts: posts.length,
				publishedPosts: posts.filter((p) => p.status === "published").length,
				draftPosts: posts.filter((p) => p.status === "draft").length,
			});
		} catch (error) {
			console.error("Error loading dashboard data:", error);
		} finally {
			setIsLoading(false);
		}
	}

	if (isLoading) {
		return <div className="text-gray-400">Loading...</div>;
	}

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-2xl font-display font-bold text-white mb-6">
					Dashboard Overview
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Stats Cards */}
					<motion.div
						whileHover={{ scale: 1.02 }}
						className="p-6 rounded-xl bg-white/5 border border-white/10"
					>
						<h3 className="text-sm font-medium text-gray-400">Total Posts</h3>
						<p className="text-3xl font-display font-bold text-white mt-2">
							{stats.totalPosts}
						</p>
					</motion.div>

					<motion.div
						whileHover={{ scale: 1.02 }}
						className="p-6 rounded-xl bg-white/5 border border-white/10"
					>
						<h3 className="text-sm font-medium text-gray-400">
							Published Posts
						</h3>
						<p className="text-3xl font-display font-bold text-white mt-2">
							{stats.publishedPosts}
						</p>
					</motion.div>

					<motion.div
						whileHover={{ scale: 1.02 }}
						className="p-6 rounded-xl bg-white/5 border border-white/10"
					>
						<h3 className="text-sm font-medium text-gray-400">Draft Posts</h3>
						<p className="text-3xl font-display font-bold text-white mt-2">
							{stats.draftPosts}
						</p>
					</motion.div>
				</div>
			</div>

			{/* Recent Posts */}
			<div>
				<h2 className="text-xl font-display font-bold text-white mb-4">
					Recent Posts
				</h2>
				<div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
					<table className="w-full">
						<thead>
							<tr className="border-b border-white/10">
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400">
									Title
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400">
									Status
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400">
									Published
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-white/10">
							{recentPosts.map((post) => (
								<tr key={post.id} className="hover:bg-white/5">
									<td className="px-6 py-4 text-sm text-white">{post.title}</td>
									<td className="px-6 py-4">
										<span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400">
											{post.status || "Draft"}
										</span>
									</td>
									<td className="px-6 py-4 text-sm text-gray-300">
										{post.published_at
											? new Date(post.published_at).toLocaleDateString()
											: "-"}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Quick Actions */}
			<div>
				<h2 className="text-xl font-display font-bold text-white mb-4">
					Quick Actions
				</h2>
				<div className="flex gap-4">
					<motion.a
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						href="/blog/new"
						className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm font-medium"
					>
						Create New Post
					</motion.a>
					<motion.a
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						href="/admin/categories"
						className="px-4 py-2 rounded-lg border border-white/10 text-white text-sm font-medium hover:bg-white/5"
					>
						Manage Categories
					</motion.a>
				</div>
			</div>
		</div>
	);
}
