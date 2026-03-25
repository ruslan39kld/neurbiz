import { createClient } from '@supabase/supabase-js';

export const getSupabaseClient = () => {
  const url = localStorage.getItem('supabase_url') || '';
  const keyRaw = localStorage.getItem('apikey_supabase_anon') || '';
  let key = '';
  try { key = atob(keyRaw); } catch { key = keyRaw; }
  if (!url || !key) return null;
  return createClient(url, key);
};
