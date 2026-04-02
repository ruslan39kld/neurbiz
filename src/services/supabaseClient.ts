import { createClient, SupabaseClient } from '@supabase/supabase-js';

<<<<<<< HEAD
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
=======
let _instance: Promise<SupabaseClient | null> | null = null;

export const getSupabaseClient = (): Promise<SupabaseClient | null> => {
  if (!_instance) {
    _instance = (async () => {
      // Primary: fetch credentials from server (uses env vars on Amvera)
      try {
        const res = await fetch('/api/config');
        if (res.ok) {
          const { supabase_url, supabase_anon_key } = await res.json();
          if (supabase_url && supabase_anon_key) {
            return createClient(supabase_url, supabase_anon_key);
          }
        }
      } catch {}

      // Fallback: localStorage (for local dev without server running)
      const url = localStorage.getItem('supabase_url') || '';
      const keyRaw = localStorage.getItem('apikey_supabase_anon') || '';
      let key = '';
      try { key = atob(keyRaw); } catch { key = keyRaw; }
      if (url && key) return createClient(url, key);

      return null;
    })();
  }
  return _instance;
};
>>>>>>> 0af1a56c3e0c5a44e1b8285dc139bedcc5882608
