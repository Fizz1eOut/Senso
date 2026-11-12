export function getTranslateErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'statusCode' in error) {
    const statusCode = Number(error.statusCode);

    if (statusCode === 400) return 'Please enter a valid word.';
    if (statusCode === 503) return 'The translation service is temporarily unavailable. Please try again later.';
    return `Server error (${statusCode}). Please try again.`;
  }

  return 'Could not connect to the server. Check your connection.';
}
