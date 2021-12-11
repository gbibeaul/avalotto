import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

export const supabase = createClient(
	process.env.VITE_SUPABASE_URL,
	process.env.VITE_SUPABASE_ANON_KEY
);
