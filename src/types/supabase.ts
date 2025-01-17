export type Database = {
	public: {
		Tables: {
			posts: {
				Row: {
					id: string;
					title: string;
					slug: string;
					content: string;
					excerpt: string | null;
					featured_image: string | null;
					published_at: string | null;
					author_id: string;
					created_at: string | null;
					updated_at: string | null;
				};
				Insert: {
					id?: string;
					title: string;
					slug: string;
					content: string;
					excerpt?: string | null;
					featured_image?: string | null;
					published_at?: string | null;
					author_id: string;
					created_at?: string | null;
					updated_at?: string | null;
				};
				Update: {
					id?: string;
					title?: string;
					slug?: string;
					content?: string;
					excerpt?: string | null;
					featured_image?: string | null;
					published_at?: string | null;
					author_id?: string;
					created_at?: string | null;
					updated_at?: string | null;
				};
			};
			profiles: {
				Row: {
					id: string;
					role: string;
					full_name: string | null;
					avatar_url: string | null;
					created_at: string | null;
					updated_at: string | null;
				};
				Insert: {
					id: string;
					role: string;
					full_name?: string | null;
					avatar_url?: string | null;
					created_at?: string | null;
					updated_at?: string | null;
				};
				Update: {
					id?: string;
					role?: string;
					full_name?: string | null;
					avatar_url?: string | null;
					created_at?: string | null;
					updated_at?: string | null;
				};
			};
			categories: {
				Row: {
					id: string;
					name: string;
					slug: string;
					created_at: string | null;
				};
				Insert: {
					id?: string;
					name: string;
					slug: string;
					created_at?: string | null;
				};
				Update: {
					id?: string;
					name?: string;
					slug?: string;
					created_at?: string | null;
				};
			};
			post_categories: {
				Row: {
					post_id: string;
					category_id: string;
				};
				Insert: {
					post_id: string;
					category_id: string;
				};
				Update: {
					post_id?: string;
					category_id?: string;
				};
			};
		};
	};
};
