export function isQuotaError(error: unknown): boolean {
  const err = error as {
    status?: number | string
    code?: number | string
    message?: string
    error?: { code?: number | string; status?: string }
  }

  const status = err?.status ?? err?.error?.status ?? err?.code ?? err?.error?.code
  const message = err?.message ?? ''

  return (
    status === 429 ||
    status === '429' ||
    status === 'RESOURCE_EXHAUSTED' ||
    message.includes('429') ||
    message.toLowerCase().includes('quota') ||
    message.toLowerCase().includes('resource_exhausted')
  )
}

export function isTimeoutError(error: unknown): boolean {
  const message = String((error as { message?: string })?.message ?? '').toLowerCase()
  return (
    (error instanceof Error && error.name === 'AbortError') ||
    message.includes('abort') ||
    message.includes('timeout') ||
    message.includes('timed out')
  )
}