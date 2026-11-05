import { normalizeWord } from '../src/utils/normalizeWord'
import { createRequestId } from '../src/utils/requestId'
import {
  getCachedEntry,
  saveDictionaryEntry,
} from '../src/services/dictionaryCache.service'
import {
  fetchDictionaryEntryFromGemini,
  AllGeminiModelsFailedError,
} from '../src/services/gemini.service'
import { fetchAudioUrl } from '../src/services/pronunciation.service'
import type { DictionaryEntry } from '../src/types/dictionary.types'

export default defineEventHandler(async (event) => {
  const reqId = createRequestId()
  const body = await readBody<{ word?: string }>(event)
  const normalized = normalizeWord(body?.word ?? '')

  if (!normalized) {
    throw createError({ statusCode: 400, statusMessage: 'word is required' })
  }

  const cached = await getCachedEntry(normalized)
  if (cached) {
    console.log(`[${reqId}] cache hit: ${normalized}`)
    return cached
  }

  try {
    const [geminiEntry, audioUrl] = await Promise.all([
      fetchDictionaryEntryFromGemini(normalized, reqId),
      fetchAudioUrl(normalized),
    ])

    const entry: DictionaryEntry = { ...geminiEntry, audio_url: audioUrl }
    await saveDictionaryEntry(normalized, entry)
    return entry
  } catch (error) {
    if (error instanceof AllGeminiModelsFailedError) {
      throw createError({ statusCode: 503, statusMessage: 'Translation service unavailable' })
    }
    console.error(`[${reqId}] unexpected error`, error)
    throw createError({ statusCode: 500, statusMessage: 'Internal error' })
  }
})