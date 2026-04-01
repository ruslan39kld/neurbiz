import { projects as defaultProjects, certificates as defaultCertificates } from '../data';
import { getSupabaseClient } from './supabaseClient';

export async function seedIfEmpty(): Promise<void> {
  const supabase = await getSupabaseClient();
  if (!supabase) return;

  // Seed projects if table is empty
  try {
    const { data: existing } = await supabase
      .from('projects')
      .select('id')
      .limit(1);

    if (!existing || existing.length === 0) {
      const projectsToInsert = defaultProjects.map(({ id: _id, ...rest }, i) => ({
        ...rest,
        sort_order: i,
      }));
      const { error } = await supabase.from('projects').insert(projectsToInsert);
      if (error) console.warn('Seed projects error:', error.message);
      else console.log('Projects seeded to Supabase');
    }
  } catch (e) {
    console.warn('Seed projects failed:', e);
  }

  // Seed certificates if table is empty
  try {
    const { data: existing } = await supabase
      .from('certificates')
      .select('id')
      .limit(1);

    if (!existing || existing.length === 0) {
      const certsToInsert = defaultCertificates.map(({ id: _id, ...rest }, i) => ({
        ...rest,
        sort_order: i,
      }));
      const { error } = await supabase.from('certificates').insert(certsToInsert);
      if (error) console.warn('Seed certificates error:', error.message);
      else console.log('Certificates seeded to Supabase');
    }
  } catch (e) {
    console.warn('Seed certificates failed:', e);
  }
}
