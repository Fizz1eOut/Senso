export interface TranslateRequest {
  word: string;
}

export type TranslateStatus = 'idle' | 'loading' | 'success' | 'error';
