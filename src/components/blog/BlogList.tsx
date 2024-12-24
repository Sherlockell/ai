import { motion } from 'framer-motion';
import type { Post } from '../../types/blog';
import BlogCard from './BlogCard';
import { staggerContainer, fadeInUp } from '../../utils/animations';

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {posts.map((post) => (
        <motion.div key={post.id} variants={fadeInUp}>
          <BlogCard post={post} />
        </motion.div>
      ))}
    </motion.div>
  );
}