import { openDB, type DBSchema } from 'idb';
import type { WordRecord } from '~/types/word-record.types';

interface SensoDB extends DBSchema {
  words: { key: string; value: WordRecord };
}

let dbPromise: ReturnType<typeof openDB<SensoDB>> | null = null;

function getDb() {
  dbPromise ??= openDB<SensoDB>('senso-db', 1, {
    upgrade(db) {
      db.createObjectStore('words', { keyPath: 'word' });
    },
  });
  return dbPromise;
}

export async function getAllWords() {
  return (await getDb()).getAll('words');
}

export async function putWord(record: WordRecord) {
  await (await getDb()).put('words', record);
}

export async function deleteWords(keys: string[]) {
  const tx = (await getDb()).transaction('words', 'readwrite');
  await Promise.all([...keys.map((k) => tx.store.delete(k)), tx.done]);
}
