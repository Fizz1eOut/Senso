import type { DictionaryEntry } from '~/types/word.types';
import type { TranslateRequest } from '~/types/translate.types';

const API_URL = 'https://senso-backend-6ipi.onrender.com';

export const translateWord = async (
  word: string,
  signal?: AbortSignal
): Promise<{ data: DictionaryEntry | null; error: unknown }> => {
  try {
    const data = await $fetch<DictionaryEntry>(`${API_URL}/translate`, {
      method: 'POST',
      body: { word } satisfies TranslateRequest,
      signal,
    });

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
