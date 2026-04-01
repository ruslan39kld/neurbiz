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
      const projectsToInsert = defaultProjects.map((p, i) => ({
        title: p.title,
        icon: p.icon,
        category: p.category,
        stage: p.stage,
        year: p.year,
        description: p.description,
        detail: p.detail,
        result: p.result,
        role: p.role,
        tags: p.tags,
        tasks: [],
        stats: p.stats,
        imageUrl: p.imageUrl,
        videoUrl: p.videoUrl,
        liveUrl: p.liveUrl,
        demo_url: p.demo_url,
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
      const certsToInsert = defaultCertificates.map((c, i) => ({
        title: c.title,
        org: c.org,
        year: c.year,
        category: c.category,
        cert_url: c.cert_url,
        image: c.image,
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
