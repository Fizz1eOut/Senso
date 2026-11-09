import { onMounted, ref, type Ref } from 'vue';
import {
  PAIR_MAX_MEANINGS,
  PAIRS_REQUEST_LIMIT,
  type WordPair,
} from '~/constants/word-loader.ts';
import { useSupabaseClient } from '#imports';

function shorten(raw: string): string {
  return raw
    .split(/[,;]/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, PAIR_MAX_MEANINGS)
    .join(', ');
}

export function useWordLoaderPairs(word: Readonly<Ref<string>>) {
  const supabase = useSupabaseClient();
  const pairs = ref<WordPair[]>([]);

  onMounted(async () => {
    try {
      const { data, error } = await supabase.rpc('get_loader_word_pairs', {
        p_limit: PAIRS_REQUEST_LIMIT,
        p_exclude: word.value,
      });
      if (error || !data) return;

      pairs.value = (data as { word: string; short_translation: string }[])
        .map((row) => ({ en: row.word, ru: shorten(row.short_translation) }))
        .filter((pair) => pair.en && pair.ru);
    } catch (err) {
      console.error('Error fetching word pairs:', err);
    }
  });

  return { pairs };
}
