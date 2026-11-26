<script setup lang="ts">
  import type { DictionaryEntry } from '~/types/word.types';
  import AppContainer from '~/components/base/AppContainer.vue';
  import WordDetailsHeader from '~/components/content/word/word-details/WordDetailsHeader.vue';
  import WordDetailsTranslations from '~/components/content/word/word-details/WordDetailsTranslations.vue';
  import WordDetailsMeanings from '~/components/content/word/word-details/WordDetailsMeanings.vue';
  import WordDetailsCollocations from '~/components/content/word/word-details/WordDetailsCollocations.vue';
  import WordDetailsExamples from '~/components/content/word/word-details/WordDetailsExamples.vue';
  import WordDetailsFamily from '~/components/content/word/word-details/WordDetailsFamily.vue';
  import WordDetailsTakeaway from '~/components/content/word/word-details/WordDetailsTakeaway.vue';

  interface WordDetailsProps {
    entry: DictionaryEntry
  }
  defineProps<WordDetailsProps>();
</script>

<template>
  <div v-if="entry" class="word-details">
    <app-container size="sm">
      <div class="word-details__body">
        <word-details-header :entry="entry" />
        <word-details-translations :entry="entry" />
        <word-details-meanings :entry="entry" />
        <word-details-collocations :entry="entry" />
        <word-details-examples :entry="entry" />
        <word-details-family :entry="entry" />
        <word-details-takeaway :entry="entry" />
      </div>
    </app-container>
  </div>
</template>

<style scoped>
  .word-details {
    max-width: 1000px;
    width: 100%;
  }
  .word-details__body > *:not(:last-child) {
    margin-bottom: var(--space-lg);
  }
</style>
