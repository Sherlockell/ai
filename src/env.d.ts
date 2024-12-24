/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
import type { SupabaseClient } from "@supabase/supabase-js";

interface ImportMetaEnv {
	readonly PUBLIC_SUPABASE_URL: string;
	readonly PUBLIC_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare namespace App {
	interface Locals {
		supabase: SupabaseClient;
	}
}
