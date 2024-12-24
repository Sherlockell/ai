import { motion } from 'framer-motion';
import type { Post } from '../../types/blog';
import { formatDate } from '../../utils/date';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-display font-bold text-white mb-2">
          <a href={`/blog/${post.slug}`} className="hover:text-blue-400 transition-colors">
            {post.title}
          </a>
        </h2>
        
        <p className="text-gray-400 mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatar_url}
              alt={post.author.name}
              className="w-6 h-6 rounded-full"
            />
            <span>{post.author.name}</span>
          </div>
          <time dateTime={post.published_at}>
            {formatDate(post.published_at)}
          </time>
        </div>
      </div>
    </motion.article>
  );
}