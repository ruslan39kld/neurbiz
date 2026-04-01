import { projects as defaultProjects, certificates as defaultCertificates } from '../data';
import { getSupabaseClient } from './supabaseClient';

export async function seedIfEmpty(): Promise<void> {
  // Skip if already seeded in this browser
  if (localStorage.getItem('supabase_seeded_v2') === 'true') return;

  const supabase = await getSupabaseClient();
  if (!supabase) return;

  try {
    // Seed projects if table is empty
    const { data: existingProjects } = await supabase
      .from('projects')
      .select('id')
      .limit(1);

    if (!existingProjects || existingProjects.length === 0) {
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

    // Seed certificates if table is empty
    const { data: existingCerts } = await supabase
      .from('certificates')
      .select('id')
      .limit(1);

    if (!existingCerts || existingCerts.length === 0) {
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

    // Mark seed as done so we skip on next page load
    localStorage.setItem('supabase_seeded_v2', 'true');
  } catch (e) {
    console.warn('Seed error:', e);
  }
}
