import { supabaseAdmin } from '../lib/supabaseClient'
import type { DictionaryEntry } from '../types/dictionary.types'

const SOURCE_LANG = 'en'
const TARGET_LANG = 'ru'

export async function getCachedEntry(normalizedWord: string): Promise<DictionaryEntry | null> {
  const { data, error } = await supabaseAdmin
    .from('dictionary_entries')
    .select('entry')
    .eq('normalized_word', normalizedWord)
    .eq('source_lang', SOURCE_LANG)
    .eq('target_lang', TARGET_LANG)
    .maybeSingle()

  if (error) {
    console.error('[dictionaryCache] lookup failed:', error)
    throw error
  }

  return (data?.entry as DictionaryEntry) ?? null
}

export async function saveDictionaryEntry(
  normalizedWord: string,
  entry: DictionaryEntry,
): Promise<void> {
  const { error } = await supabaseAdmin
    .from('dictionary_entries')
    .upsert(
      {
        word: entry.word,
        normalized_word: normalizedWord,
        source_lang: SOURCE_LANG,
        target_lang: TARGET_LANG,
        entry,
      },
      {
        onConflict: 'normalized_word,source_lang,target_lang',
        ignoreDuplicates: true,
      },
    )

  if (error) {
    console.error('[dictionaryCache] save failed:', error)
  }
}