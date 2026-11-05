export async function fetchAudioUrl(word: string): Promise<string | null> {
  if (word.includes(' ')) return null

  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`,
      { signal: AbortSignal.timeout(3000) },
    )
    if (!res.ok) return null

    const data = await res.json()
    const url: string | undefined = data[0]?.phonetics?.find(
      (p: { audio?: string }) => p.audio,
    )?.audio
    if (!url) return null

    return url.startsWith('//') ? `https:${url}` : url
  } catch {
    return null
  }
}