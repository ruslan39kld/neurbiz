import { createClient } from '@supabase/supabase-js';

// PRODUCTION CREDENTIALS - работают на ВСЕХ устройствах
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://fszyqkfwggdcmuywtzhp.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzenlxa2Z3Z2dkY211eXd0emhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MDQxMzgsImV4cCI6MjA4OTQ4MDEzOH0.hc2bw8ADeHpbMRwW2vbVDYpZeVxI4UJgckLk3BzFT6Y';

export const getSupabaseClient = () => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Supabase credentials missing!');
    return null;
  }
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
};