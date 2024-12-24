export type PostStatus = 'draft' | 'scheduled' | 'published' | 'archived';

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
  categories?: Category[];
  author?: Author;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Author {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
}

export interface PostInput {
  title: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  status?: PostStatus;
  published_at?: string | null;
  category_ids?: string[];
}

export interface PostUpdate extends Partial<PostInput> {
  id: string;
}