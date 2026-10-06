export const MODEL_FALLBACK_CHAIN = [
  'gemini-3.8-flash',
  'gemini-3.5-flash',
  'gemini-3-flash-preview',
] as const

export const MODEL_TIMEOUTS_MS: Record<string, number> = {
  'gemini-3.8-flash': 15_000,
  'gemini-3.5-flash': 15_000,
  'gemini-3-flash-preview': 25_000,
}

export const DEFAULT_TIMEOUT_MS = 15_000

export const DEBUG_MINIMAL = false