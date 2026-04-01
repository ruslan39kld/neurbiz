import { createClient, SupabaseClient } from '@supabase/supabase-js';

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
