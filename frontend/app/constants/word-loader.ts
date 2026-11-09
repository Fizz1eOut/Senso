export const COPY = {
  caption: 'Составляю словарную статью…',
  slow:
    'Это занимает дольше обычного, пробую запасной вариант. ' +
    'Статья сохранится, и в следующий раз откроется мгновенно.',
  pairLabel: 'Пока ждёте',
  ariaLabel: (word: string) => `Составляю словарную статью для слова ${word}`,
};

export const SECTIONS = [
  { key: 'meanings', label: 'Meanings' },
  { key: 'collocations', label: 'Collocations' },
  { key: 'family', label: 'Word family' },
  { key: 'examples', label: 'Examples' },
  { key: 'takeaway', label: 'Key takeaway' },
] as const;

export type SectionKey = (typeof SECTIONS)[number]['key'];
export type SectionState = 'pending' | 'active' | 'done';

export interface WordPair {
  en: string;
  ru: string;
}

export const TICK_MS = 250;
export const STAGE_MS = 5000;
export const PAIR_MS = 5000;
export const SLOW_AFTER_MS = 15_000;
export const FINISH_STEP_MS = 100;
export const COMPLETE_DELAY_MS = 350;

export const PROGRESS_CAP = 95;
export const PROGRESS_TAU_S = 14;

export const PAIRS_REQUEST_LIMIT = 12;
export const PAIR_MAX_MEANINGS = 2;
