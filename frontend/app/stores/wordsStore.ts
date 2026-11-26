import { ref, computed, toRaw } from 'vue';
import { defineStore } from 'pinia';
import { normalizeWord } from '~/utils/normalize-word';
import { getAllWords, putWord, deleteWords } from '~/utils/words-db';
import type { DictionaryEntry } from '~/types/word.types';
import type { WordRecord, WordStatus } from '~/types/word-record.types';

const HISTORY_LIMIT = 7;

export const useWordsStore = defineStore('words', () => {
  const records = ref<WordRecord[]>([]);

  const history = computed(() =>
    [...records.value]
      .sort((a, b) => b.searchedAt - a.searchedAt)
      .slice(0, HISTORY_LIMIT),
  );

  const favorites = computed(() =>
    records.value
      .filter((r) => r.status === 'learning')
      .sort((a, b) => (b.savedAt ?? 0) - (a.savedAt ?? 0)),
  );

  const learned = computed(() =>
    records.value
      .filter((r) => r.status === 'learned')
      .sort((a, b) => (b.learnedAt ?? 0) - (a.learnedAt ?? 0)),
  );

  const getRecord = (word: string) => records.value.find(r => r.word === word);

  async function load() {
    try {
      records.value = await getAllWords();
    } catch (e) {
      console.error('Не удалось прочитать слова', e);
    }
  }

  async function persist(record: WordRecord) {
    try {
      await putWord(toRaw(record));
    } catch (e) {
      console.error('Не удалось сохранить слово', e);
    }
  }


  async function cleanup() {
    const inHistory = new Set(history.value.map((r) => r.word));
    const stale = records.value.filter(
      (r) => !inHistory.has(r.word) && r.status === null,
    );
    if (!stale.length) return;

    records.value = records.value.filter((r) => !stale.includes(r));
    try {
      await deleteWords(stale.map((r) => r.word));
    } catch (e) {
      console.error('Не удалось почистить историю', e);
    }
  }


  async function recordSearch(entry: DictionaryEntry) {
    const key = normalizeWord(entry.word);
    const existing = records.value.find((r) => r.word === key);

    const record: WordRecord = {
      status: null,
      savedAt: null,
      learnedAt: null,
      ...existing,
      word: key,
      entry,
      searchedAt: Date.now(),
    };

    records.value = [record, ...records.value.filter((r) => r.word !== key)];
    await persist(record);
    await cleanup();
  }

  async function toggleFavorite(word: string) {
    const record = records.value.find((r) => r.word === word);
    if (!record) return;

    if (record.status === 'learning') {
      record.status = null;
      record.savedAt = null;
      record.learnedAt = null;
    } else {
      record.status = 'learning';
      record.savedAt = Date.now();
      record.learnedAt = null;
    }
    await persist(record);
    await cleanup();
  }

  async function setStatus(word: string, status: WordStatus) {
    const record = records.value.find((r) => r.word === word);
    if (!record || record.status === status) return;

    record.status = status;
    record.savedAt = status === 'learning' ? Date.now() : record.savedAt;
    record.learnedAt = status === 'learned' ? Date.now() : null;
    await persist(record);
  }

  return {
    records, history, favorites, learned,
    load, recordSearch, toggleFavorite, setStatus, getRecord
  };
});
