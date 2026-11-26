<script setup lang="ts">
  import type { DictionaryEntry } from '~/types/word.types';
  import AppSubtitle from '~/components/base/AppSubtitle.vue';
 
  interface WordDetailsTranslationsProps {
    entry: DictionaryEntry
  }
  defineProps<WordDetailsTranslationsProps>();

  const POS_LABELS: Record<string, string> = {
    noun: 'As a noun (существительное)',
    verb: 'As a verb (глагол)',
    adjective: 'As an adjective (прилагательное)',
    adverb: 'As an adverb (наречие)',
    pronoun: 'As a pronoun (местоимение)',
    preposition: 'As a preposition (предлог)',
    conjunction: 'As a conjunction (союз)',
    interjection: 'As an interjection (междометие)',
    determiner: 'As a determiner (определитель)',
    numeral: 'As a numeral (числительное)',
    article: 'As an article (артикль)',
    particle: 'As a particle (частица)',
    modal: 'As a modal verb (модальный глагол)',
  };

  function groupTitle(form: string): { en: string; ru: string } {
    const first = (form.trim().split(/[\s(]/)[0] ?? '').toLowerCase();
    const label = POS_LABELS[first] ?? form;

    const match = label.match(/^(.*?)\s*\((.*)\)$/);
    return match
      ? { en: match[1] ?? label, ru: match[2] ?? '' }
      : { en: label, ru: '' };
  }
</script>

<template>
  <div class="translations">
    <app-subtitle>All translations</app-subtitle>
    <div
      v-for="(item, index) in entry.allTranslations"
      :key="index"
      class="translations__body"
    >
      <div class="translations__label">
        <span class="translations__pos">{{ groupTitle(item.form).en }}</span>
        <span v-if="groupTitle(item.form).ru" class="translations__ru">
          {{ groupTitle(item.form).ru }}
        </span>
      </div>
      <ul class="translations__list">
        <li
          v-for="(translation, translationIndex) in item.translations"
          :key="translationIndex"
          class="translations__item"
        >
          {{ translation }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  .translations__body {
    margin-top: var(--space-sm);
  }
  .translations__label {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }
  .translations__pos {
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-secondary);
    font-family: var(--ff-phonetic);
  }
  .translations__ru {
    font-size: var(--fs-xs);
    color: var(--text-muted);
    font-family: var(--ff-phonetic);
  }
  .translations__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: var(--space-xs) 0 0;
    padding: 0;
    list-style: none;
  }
  .translations__item {
    font-size: var(--fs-md);
    color: var(--text-primary);
  }
  .translations__item + .translations__item::before {
    content: '·';
    margin: 0 10px;
    color: var(--text-disabled);
  }
</style>
