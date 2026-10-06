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

export interface DictionaryEntry {
  word: string
  shortTranslation: string
  level: string
  frequency: number
  style: string
  meanings: Meaning[]
  collocations: Collocation[]
  allTranslations: TranslationGroup[]
  wordFamily: WordFamilyItem[]
  examples: Example[]
  keyTakeaway: string
}