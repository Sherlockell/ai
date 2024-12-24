import { supabase } from "./supabase";
import type { Post, PostInput, PostUpdate, Category } from "../types/blog";

// Post Management
export async function getPosts() {
	const { data, error } = await supabase
		.from("posts")
		.select(
			`
      *,
      author:profiles(
        id,
        full_name,
        avatar_url,
        role
      )
    `
		)
		.order("created_at", { ascending: false });

	if (error) throw error;
	return data;
}

export async function getPostBySlug(slug: string) {
	const { data, error } = await supabase
		.from("posts")
		.select(
			`
      *,
      author:profiles(
        id,
        full_name,
        avatar_url,
        role
      )
    `
		)
		.eq("slug", slug)
		.single();

	if (error) throw error;
	return data;
}

export async function createPost(post: PostInput) {
	const { data: userData, error: userError } = await supabase.auth.getUser();
	if (userError) throw userError;

	// Start a transaction
	const { data, error } = await supabase.rpc("create_post", {
		post_data: {
			...post,
			author_id: userData.user.id,
		},
		category_ids: post.category_ids || [],
	});

	if (error) throw error;
	return data;
}

export async function updatePost({ id, ...post }: PostUpdate) {
	// Start a transaction
	const { data, error } = await supabase.rpc("update_post", {
		post_id: id,
		post_data: post,
		category_ids: post.category_ids || [],
	});

	if (error) throw error;
	return data;
}

export async function deletePost(id: string) {
	const { error } = await supabase.from("posts").delete().eq("id", id);

	if (error) throw error;
}

// Category Management
export async function getCategories() {
	const { data, error } = await supabase
		.from("categories")
		.select("*")
		.order("name");

	if (error) throw error;
	return data as Category[];
}

export async function createCategory(name: string) {
	const { data, error } = await supabase
		.from("categories")
		.insert([{ name }])
		.select()
		.single();

	if (error) throw error;
	return data as Category;
}

export async function deleteCategory(id: string) {
	const { error } = await supabase.from("categories").delete().eq("id", id);

	if (error) throw error;
}
