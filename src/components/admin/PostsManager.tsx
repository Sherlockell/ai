import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getPosts, deletePost } from "../../lib/blog";
import type { Post } from "../../types/blog";

export default function PostsManager() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		loadPosts();
	}, []);

	async function loadPosts() {
		try {
			const data = await getPosts();
			setPosts(data);
		} catch (error) {
			console.error("Error loading posts:", error);
		} finally {
			setIsLoading(false);
		}
	}

	async function handleDelete(id: string) {
		if (!confirm("Are you sure you want to delete this post?")) return;

		try {
			await deletePost(id);
			setPosts(posts.filter((post) => post.id !== id));
		} catch (error) {
			console.error("Error deleting post:", error);
		}
	}

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-display font-bold text-white">
					Manage Posts
				</h1>
				<motion.a
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					href="/blog/new"
					className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm font-medium"
				>
					New Post
				</motion.a>
			</div>

			{isLoading ? (
				<div className="text-gray-400">Loading...</div>
			) : (
				<div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
					<table className="w-full">
						<thead>
							<tr className="border-b border-white/10">
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400">
									Title
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400">
									Author
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400">
									Status
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-400">
									Published
								</th>
								<th className="px-6 py-3 text-right text-xs font-medium text-gray-400">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-white/10">
							{posts.map((post) => (
								<tr key={post.id} className="hover:bg-white/5">
									<td className="px-6 py-4 text-sm text-white">{post.title}</td>
									<td className="px-6 py-4 text-sm text-gray-300">
										{post.author?.full_name}
									</td>
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
									<td className="px-6 py-4 text-right space-x-2">
										<a
											href={`/admin/posts/${post.id}/edit`}
											className="text-sm text-blue-400 hover:text-blue-300"
										>
											Edit
										</a>
										<button
											onClick={() => handleDelete(post.id)}
											className="text-sm text-red-400 hover:text-red-300"
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
