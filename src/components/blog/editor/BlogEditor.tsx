import { useState } from 'react';
import { motion } from 'framer-motion';
import RichTextEditor from './RichTextEditor';

interface Post {
	title: string;
	content: string;
	published: boolean;
}

export default function BlogEditor() {
	const [post, setPost] = useState<Post>({
		title: "",
		content: "",
		published: false,
	});
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setIsLoading(true);

		try {
			// TODO: Implement post creation
			console.log("Creating post:", post);
		} catch (error) {
			console.error("Error creating post:", error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="max-w-4xl mx-auto px-6">
			<form onSubmit={handleSubmit} className="space-y-8">
				{/* Title Input */}
				<div>
					<label
						htmlFor="title"
						className="block text-sm font-medium text-gray-300 mb-2"
					>
						Title
					</label>
					<input
						id="title"
						type="text"
						value={post.title}
						onChange={(e) => setPost({ ...post, title: e.target.value })}
						required
						className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
						placeholder="Enter post title..."
					/>
				</div>

				{/* Rich Text Editor */}
				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						Content
					</label>
					<RichTextEditor
						value={post.content}
						onChange={(content) => setPost({ ...post, content })}
					/>
				</div>

				{/* Publish Toggle */}
				<div className="flex items-center">
					<input
						id="published"
						type="checkbox"
						checked={post.published}
						onChange={(e) => setPost({ ...post, published: e.target.checked })}
						className="h-4 w-4 rounded border-white/10 bg-white/5 text-blue-500 focus:ring-2 focus:ring-blue-500/20"
					/>
					<label
						htmlFor="published"
						className="ml-2 text-sm font-medium text-gray-300"
					>
						Publish immediately
					</label>
				</div>

				{/* Submit Button */}
				<motion.button
					type="submit"
					disabled={isLoading}
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isLoading ? "Creating..." : "Create Post"}
				</motion.button>
			</form>
		</div>
	);
}