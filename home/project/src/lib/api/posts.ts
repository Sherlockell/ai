import { supabase } from '../supabase';
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
    .rpc('create_post', {
      post_data: post,
      category_ids: post.category_ids || []
    });

  if (error) throw error;
  return data;
}

export async function updatePost(id: string, post: Partial<Post>) {
  const { data, error } = await supabase
    .rpc('update_post', {
      post_id: id,
      post_data: post,
      category_ids: post.category_ids || []
    });

  if (error) throw error;
  return data;
}

export async function deletePost(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
}