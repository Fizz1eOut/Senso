import { supabaseAdmin } from '../src/lib/supabaseClient'
import type { DictionaryEntry } from '../src/types/dictionary.types'

const SOURCE_LANG = 'en'
const TARGET_LANG = 'ru'

const ENTRY_COLUMNS = [
  'word',
  'short_translation',
  'level',
  'frequency',
  'style',
  'meanings',
  'collocations',
  'all_translations',
  'word_family',
  'examples',
  'key_takeaway',
].join(', ')

interface DictionaryEntryRow {
  word: string
  short_translation: string
  level: string
  frequency: number
  style: string
  meanings: DictionaryEntry['meanings']
  collocations: DictionaryEntry['collocations']
  all_translations: DictionaryEntry['allTranslations']
  word_family: DictionaryEntry['wordFamily']
  examples: DictionaryEntry['examples']
  key_takeaway: string
}

function rowToEntry(row: DictionaryEntryRow): DictionaryEntry {
  return {
    word: row.word,
    shortTranslation: row.short_translation,
    level: row.level,
    frequency: row.frequency,
    style: row.style,
    meanings: row.meanings,
    collocations: row.collocations,
    allTranslations: row.all_translations,
    wordFamily: row.word_family,
    examples: row.examples,
    keyTakeaway: row.key_takeaway,
  }
}

function clampFrequency(value: number): number {
  return Math.min(10, Math.max(1, Math.round(value)))
}

export async function getCachedEntry(normalizedWord: string): Promise<DictionaryEntry | null> {
  const { data, error } = await supabaseAdmin
    .from('dictionary_entries')
    .select(ENTRY_COLUMNS)
    .eq('normalized_word', normalizedWord)
    .eq('source_lang', SOURCE_LANG)
    .eq('target_lang', TARGET_LANG)
    .maybeSingle()

  if (error) {
    console.error('[dictionaryCache] lookup failed:', error)
    throw error
  }

  return data ? rowToEntry(data as unknown as DictionaryEntryRow) : null
}

export async function saveDictionaryEntry(
  normalizedWord: string,
  entry: DictionaryEntry,
): Promise<void> {
  const { error } = await supabaseAdmin.from('dictionary_entries').upsert(
    {
      normalized_word: normalizedWord,
      source_lang: SOURCE_LANG,
      target_lang: TARGET_LANG,
      word: entry.word,
      short_translation: entry.shortTranslation,
      level: entry.level,
      frequency: clampFrequency(entry.frequency),
      style: entry.style,
      meanings: entry.meanings,
      collocations: entry.collocations,
      all_translations: entry.allTranslations,
      word_family: entry.wordFamily,
      examples: entry.examples,
      key_takeaway: entry.keyTakeaway,
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