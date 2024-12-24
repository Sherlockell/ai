import { supabase } from './client';
import type { Post } from '../../types/database';

export async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles(id, full_name, avatar_url),
      categories:post_categories(categories(id, name, slug))
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles(id, full_name, avatar_url),
      categories:post_categories(categories(id, name, slug))
    `)
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

export async function createPost(post: Partial<Post>) {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select()
    .single();

  if (error) throw error;
  return data;
}