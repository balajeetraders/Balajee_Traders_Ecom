
import { createClient } from '@supabase/supabase-js';

// ------------------------------------------------------------------
// ACTION REQUIRED: PASTE YOUR SUPABASE CREDENTIALS BELOW
// ------------------------------------------------------------------

// 1. Go to Supabase Dashboard > Project Settings > API
// 2. Copy "Project URL"
const SUPABASE_URL = 'https://aeioehcbrbpfcuurjqwl.supabase.co'; 

// 3. Copy "anon" / "public" key
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaW9laGNicmJwZmN1dXJqcXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MjA2MjgsImV4cCI6MjA4NjM5NjYyOH0.EtSUCnna0OQ7dEsFjAiTYb-znXji9Qg5Zpw6G8Mpk_M';

// Helper to check if the user has updated the credentials
export const isSupabaseConfigured = () => {
  return SUPABASE_URL !== 'https://aeioehcbrbpfcuurjqwl.supabase.co' && 
         SUPABASE_ANON_KEY !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaW9laGNicmJwZmN1dXJqcXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MjA2MjgsImV4cCI6MjA4NjM5NjYyOH0.EtSUCnna0OQ7dEsFjAiTYb-znXji9Qg5Zpw6G8Mpk_M';
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
