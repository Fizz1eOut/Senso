export function normalizeWord(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, ' ')
}