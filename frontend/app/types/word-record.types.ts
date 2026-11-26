import type { DictionaryEntry } from '~/types/word.types';

export type WordStatus = 'learning' | 'learned';

export interface WordRecord {
  word: string;
  entry: DictionaryEntry;
  searchedAt: number;
  status: WordStatus | null;
  savedAt: number | null;
  learnedAt: number | null;
}
