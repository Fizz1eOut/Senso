export const MINIMAL_SCHEMA = {
  type: 'object',
  properties: {
    word: { type: 'string' },
    shortTranslation: { type: 'string' },
  },
  required: ['word', 'shortTranslation'],
}

export const RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    word: { type: 'string' },
    shortTranslation: { type: 'string' },
    level: { type: 'string', enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
    frequency: { type: 'integer' },
    style: {
      type: 'string',
      enum: ['Neutral', 'Formal', 'Informal', 'Slang', 'Literary'],
    },
    meanings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          pattern: { type: 'string' },
          translation: { type: 'string' },
          exampleEn: { type: 'string' },
          exampleRu: { type: 'string' },
        },
        required: ['pattern', 'translation', 'exampleEn', 'exampleRu'],
      },
    },
    collocations: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          phrase: { type: 'string' },
          translation: { type: 'string' },
        },
        required: ['phrase', 'translation'],
      },
    },
    allTranslations: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          form: { type: 'string' },
          translations: { type: 'array', items: { type: 'string' } },
        },
        required: ['form', 'translations'],
      },
    },
    wordFamily: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          form: { type: 'string' },
          translation: { type: 'string' },
        },
        required: ['form', 'translation'],
      },
    },
    examples: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          en: { type: 'string' },
          ru: { type: 'string' },
        },
        required: ['en', 'ru'],
      },
    },
    keyTakeaway: { type: 'string' },
  },
  required: [
    'word', 'shortTranslation', 'level', 'frequency', 'style',
    'meanings', 'collocations', 'allTranslations', 'wordFamily',
    'examples', 'keyTakeaway',
  ],
}