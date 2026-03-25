import { getSupabaseClient } from './supabaseClient';

export const searchKnowledge = async (query: string): Promise<string> => {
  const supabase = getSupabaseClient();
  if (!supabase) return '';

  try {
    const keywords = query.toLowerCase()
      .replace(/[^\wа-яё\s]/gi, '')
      .split(' ')
      .filter(w => w.length > 3)
      .slice(0, 4);

    if (keywords.length === 0) return '';

    const results: any[] = [];

    for (const keyword of keywords) {
      const { data } = await supabase
        .from('knowledge_base')
        .select('module_title, lesson_title, file_type, content')
        .ilike('content', `%${keyword}%`)
        .limit(2);

      if (data) results.push(...data);
    }

    // Убираем дубликаты
    const seen = new Set();
    const unique = results.filter(item => {
      const key = `${item.lesson_title}_${item.file_type}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    if (unique.length === 0) return '';

    return unique
      .slice(0, 3)
      .map(chunk =>
        `[${chunk.module_title} → ${chunk.lesson_title}]\n` +
        chunk.content.slice(0, 600)
      )
      .join('\n\n---\n\n');

  } catch (e) {
    console.error('RAG error:', e);
    return '';
  }
};
