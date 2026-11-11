import { DEBUG_MINIMAL } from '../config/gemini.config'

export function buildPrompt(word: string): string {
  if (DEBUG_MINIMAL) {
    return `Translate the English word "${word}" into Russian. Respond only with JSON matching the schema.`
  }

  return `You are an English-Russian dictionary assistant for a language-learning app.
Analyze the English word or phrase: "${word}"

Provide a rich dictionary entry in Russian for a learner. Follow these rules:
- level: CEFR level (A1-C2) of this word
- frequency: how common the word is in everyday English, 1 (rare) to 10 (very common)
- style: register of the word (Neutral, Formal, Informal, Slang, Literary)
- transcription: IPA transcription of the word in slashes, e.g. /ˈfænsi/. If the input is a phrase, transcribe the whole phrase. Do not add anything except the transcription itself.
- meanings: 2-5 core usage patterns of the word, each with the grammatical pattern (e.g. "involve someone"), its Russian translation, and one natural English example sentence with its Russian translation
- collocations: 3-8 common short collocations/phrases with this word and their Russian translation
- allTranslations: a full overview of Russian translations grouped by part of speech.
  Create one group for every part of speech the word really functions as, most common first.
  Start each "form" with the plain English part-of-speech name ("adjective", "verb", "noun", "adverb", "interjection"),
  optionally followed by a short note in parentheses.
  Give up to 10 distinct Russian translations per group, most common first, covering different senses.
  Include only translations that really exist: do not pad a group to reach the limit.
  For a narrow sense add a short clarification in parentheses, e.g. "скудный (о внешности или обстановке)".
  Do not repeat the same translation in different groups.
- wordFamily: related word forms (noun, adjective, adverb, etc.) with short Russian translations
- examples: 4-6 example sentences (English + Russian), different from the ones already used in meanings
- keyTakeaway: one short, memorable tip in Russian about the most important thing to remember about this word

Respond only with the JSON matching the schema.`
}