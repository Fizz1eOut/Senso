export interface Meaning {
  pattern: string
  translation: string
  exampleEn: string
  exampleRu: string
}

export interface Collocation {
  phrase: string
  translation: string
}

export interface TranslationGroup {
  form: string
  translations: string[]
}

export interface WordFamilyItem {
  form: string
  translation: string
}

export interface Example {
  en: string
  ru: string
}

export interface DictionaryEntryRow {
  word: string
  short_translation: string
  transcription: string | null
  level: string
  frequency: number
  style: string
  meanings: Meaning[]
  collocations: Collocation[]
  all_translations: TranslationGroup[]
  word_family: WordFamilyItem[]
  examples: Example[]
  key_takeaway: string
  audio_url: string | null 
}

export interface DictionaryEntry {
  word: string
  shortTranslation: string
  transcription: string | null
  level: string
  frequency: number
  style: string
  meanings: Meaning[]
  collocations: Collocation[]
  allTranslations: TranslationGroup[]
  wordFamily: WordFamilyItem[]
  examples: Example[]
  keyTakeaway: string
  audio_url: string | null 
}

export type GeminiEntry = Omit<DictionaryEntry, 'audioUrl'>