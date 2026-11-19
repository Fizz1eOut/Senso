import type { DictionaryEntry } from '~/types/word.types';

export interface WordRecord {
  word: string;
  entry: DictionaryEntry;
  searchedAt: number;
}
