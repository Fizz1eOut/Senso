export interface WordSuggestion {
  word: string;
  shortTranslation: string | null;
  level: string | null;
}

export interface DatamuseSuggestion {
  word: string;
  score: number;
}
