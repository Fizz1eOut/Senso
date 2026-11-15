import { onScopeDispose, ref, watch, type Ref } from 'vue';
import { debounce } from '~/utils/debounce';
import { fetchLocalWordSuggestions } from '~/api/local-word-suggestions';
import { fetchExternalWordSuggestions } from '~/api/external-word-suggestions';
import type { WordSuggestion } from '~/types/word-suggestions.types';

export function useWordSuggestions(query: Ref<string>) {
  const suggestions = ref<WordSuggestion[]>([]);

  const load = debounce(async (q: string) => {
    const [local, external] = await Promise.all([
      fetchLocalWordSuggestions(q),
      fetchExternalWordSuggestions(q),
    ]);

    if (q !== query.value.trim()) return;

    const localWords = local.data ?? [];
    const seen = new Set(localWords.map((s) => s.word.toLocaleLowerCase()));
    const fresh = (external.data ?? []).filter((s) => !seen.has(s.word.toLocaleLowerCase()));

    
    suggestions.value = [...localWords, ...fresh];
  }, 200);

  watch(query, (value) => {
    const q = value.trim();

    if (q.length < 2) {
      load.cancel();
      suggestions.value = [];
      return;
    }

    load(q);
  });

  onScopeDispose(load.cancel);

  return { suggestions };
}
