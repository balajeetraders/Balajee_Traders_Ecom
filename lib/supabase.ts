
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://aeioehcbrbpfcuurjqwl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaW9laGNicmJwZmN1dXJqcXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MjA2MjgsImV4cCI6MjA4NjM5NjYyOH0.EtSUCnna0OQ7dEsFjAiTYb-znXji9Qg5Zpw6G8Mpk_M';

export const isSupabaseConfigured = () => true;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // Persist session in localStorage so it survives page refresh
    persistSession: true,
    // Automatically detect & exchange OAuth tokens from the URL hash/query
    detectSessionInUrl: true,
    // PKCE flow is required for SPA OAuth (more secure than implicit)
    flowType: 'pkce',
    // Storage key prefix
    storageKey: 'bt-auth',
  },
});
