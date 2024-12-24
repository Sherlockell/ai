// Database types for type safety
export type PostStatus = 'draft' | 'published' | 'scheduled';

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  status: PostStatus;
  published_at: string | null;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Profile {
  id: string;
  role: 'user' | 'admin';
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}