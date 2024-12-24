import { motion } from 'framer-motion';
import type { Post } from '../../types/blog';
import { formatDate } from '../../utils/date';

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="aspect-video rounded-2xl overflow-hidden mb-8"
      >
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
          {post.title}
        </h1>
        
        <div className="flex items-center gap-4 text-gray-400 mb-8">
          <time dateTime={post.published_at || ''}>
            {formatDate(post.published_at || post.created_at)}
          </time>
          <span>·</span>
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatar_url}
              alt={post.author.name}
              className="w-6 h-6 rounded-full"
            />
            <span>{post.author.name}</span>
          </div>
        </div>

        <div 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </motion.div>
    </motion.article>
  );
}