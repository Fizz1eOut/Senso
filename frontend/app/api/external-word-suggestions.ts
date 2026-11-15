import type { DatamuseSuggestion, WordSuggestion } from '~/types/word-suggestions.types';

const DATAMUSE_URL = 'https://api.datamuse.com/sug';

export const fetchExternalWordSuggestions = async (
  q: string,
  signal?: AbortSignal
): Promise<{ data: WordSuggestion[] | null; error: unknown }> => {
  try {
    const response = await $fetch<DatamuseSuggestion[]>(DATAMUSE_URL, {
      query: { s: q, max: 10 },
      signal,
    });

    return {
      data: response.map((item) => ({
        word: item.word,
        shortTranslation: null,
        level: null,
      })),
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
};
