import { useSupabaseClient } from '#imports';
import type { Database } from '~/../types/database';
import type { WordSuggestion } from '~/types/word-suggestions.types';

export const fetchLocalWordSuggestions = async (
  q: string
): Promise<{ data: WordSuggestion[] | null; error: unknown }> => {
  const supabase = useSupabaseClient<Database>();
  const prefix = q.toLowerCase().replace(/[^\p{L}\s'-]/gu, '');

  const { data, error } = await supabase
    .from('dictionary_entries')
    .select('word, shortTranslation:short_translation, level')
    .like('normalized_word', `${prefix}%`)
    .eq('source_lang', 'en')
    .eq('target_lang', 'ru')
    .order('frequency', { ascending: false })
    .limit(8);

  if (error || !data) {
    return { data: null, error };
  }

  return { data: data as WordSuggestion[], error: null };
};
