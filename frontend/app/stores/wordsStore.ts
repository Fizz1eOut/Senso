import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getAllWords, putWord, deleteWords } from '~/utils/words-db';
import type { DictionaryEntry } from '~/types/word.types';
import type { WordRecord } from '~/types/word-record.types';

const HISTORY_LIMIT = 7;

const byNewest = (a: WordRecord, b: WordRecord) => b.searchedAt - a.searchedAt;

export const useWordsStore = defineStore('words', () => {
  const records = ref<WordRecord[]>([]);

  async function load() {
    try {
      records.value = (await getAllWords()).sort(byNewest);
    } catch (e) {
      console.error('Failed to read the history', e);
    }
  }

  async function recordSearch(entry: DictionaryEntry) {
    const word = entry.word.trim().toLowerCase();
    const record: WordRecord = { word, entry, searchedAt: Date.now() };

    const next = [record, ...records.value.filter((r) => r.word !== word)];
    const stale = next.slice(HISTORY_LIMIT);
    records.value = next.slice(0, HISTORY_LIMIT);

    try {
      await putWord(record);
      if (stale.length) await deleteWords(stale.map((r) => r.word));
    } catch (e) {
      console.error('Failed to save history', e);
    }
  }

  return { records, load, recordSearch };
});
