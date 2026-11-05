import { supabaseAdmin } from '../lib/supabaseClient'
import type { DictionaryEntry, DictionaryEntryRow } from '../types/dictionary.types'

const SOURCE_LANG = 'en'
const TARGET_LANG = 'ru'

const ENTRY_COLUMNS = [
  'word',
  'transcription',
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
  'audio_url',
].join(', ')

function rowToEntry(row: DictionaryEntryRow): DictionaryEntry {
  return {
    word: row.word,
    transcription: row.transcription,
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
    audio_url: row.audio_url,
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
      transcription: entry.transcription,
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
      audio_url: entry.audio_url,
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