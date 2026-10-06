import { GoogleGenAI } from '@google/genai'
import {
  MODEL_FALLBACK_CHAIN,
  MODEL_TIMEOUTS_MS,
  DEFAULT_TIMEOUT_MS,
  DEBUG_MINIMAL,
} from '../config/gemini.config'
import { MINIMAL_SCHEMA, RESPONSE_SCHEMA } from '../schemas/dictionaryEntry.schema'
import { buildPrompt } from '../prompts/dictionary.prompt'
import { withTimeout } from '../utils/timeout'
import { isQuotaError, isTimeoutError } from '../utils/errors'
import type { DictionaryEntry } from '../types/dictionary.types'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

export class AllGeminiModelsFailedError extends Error {
  constructor(public readonly cause: unknown) {
    super('All Gemini models failed or quota exceeded')
    this.name = 'AllGeminiModelsFailedError'
  }
}

export async function fetchDictionaryEntryFromGemini(
  word: string,
  reqId: string,
): Promise<DictionaryEntry> {
  const prompt = buildPrompt(word)
  let lastError: unknown = null

  for (const model of MODEL_FALLBACK_CHAIN) {
    const timeoutMs = MODEL_TIMEOUTS_MS[model] ?? DEFAULT_TIMEOUT_MS

    try {
      console.log(`[${reqId}] Trying model: ${model} (timeout ${timeoutMs}ms)`)

      const interactionPromise = ai.interactions.create(
        {
          model,
          input: prompt,
          generation_config: { thinking_level: 'low' },
          response_format: {
            type: 'text',
            mime_type: 'application/json',
            schema: DEBUG_MINIMAL ? MINIMAL_SCHEMA : RESPONSE_SCHEMA,
          },
        },
        { timeout: timeoutMs },
      )

      const interaction = await withTimeout(interactionPromise, timeoutMs)
      const outputText = interaction.output_text

      if (!outputText) {
        throw new Error('Gemini returned empty output_text')
      }

      const entry = JSON.parse(outputText) as DictionaryEntry
      console.log(`[${reqId}] SUCCESS with model: ${model}`)
      return entry
    } catch (error) {
      lastError = error

      if (isQuotaError(error) || isTimeoutError(error)) {
        console.warn(
          isTimeoutError(error)
            ? `[${reqId}] Model ${model} timed out after ${timeoutMs}ms, trying next model...`
            : `[${reqId}] Model ${model} hit quota limit, trying next model...`,
        )
        continue
      }

      console.error(`[${reqId}] Model ${model} failed with non-quota error`, error)
      break
    }
  }

  throw new AllGeminiModelsFailedError(lastError)
}