<script setup lang="ts">
  import type { DictionaryEntry } from '~/types/word.types';
  import AppSubtitle from '~/components/base/AppSubtitle.vue';
 
  interface WordDetailsMeaningsProps {
    entry: DictionaryEntry
  }
  defineProps<WordDetailsMeaningsProps>();
</script>

<template>
  <div class="meanings">
    <app-subtitle>Meanings</app-subtitle>

    <ul class="meanings__list">
      <li
        v-for="(meaning, index) in entry.meanings"
        :key="index"
        class="meanings__item"
      >
        <div class="meanings__head">
          <div class="meanings__pattern">{{ meaning.pattern }}</div>
          <div class="meanings__translation">{{ meaning.translation }}</div>
        </div>
        <div class="meanings__example">
          <div class="meanings__en">{{ meaning.exampleEn }}</div>
          <div class="meanings__ru">{{ meaning.exampleRu }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.meanings__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: var(--space-sm);
    padding: 0;
    list-style: none;
  }
  .meanings__item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: var(--space-md);
    border-left: 1px solid var(--accent);
  }
  .meanings__head {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .meanings__pattern {
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    color: var(--text-primary);
    font-family: var(--ff-phonetic);
  }
  .meanings__translation {
    font-size: var(--fs-sm);
    color: var(--text-secondary);
    font-family: var(--ff-phonetic);
  }
  .meanings__example {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .meanings__en {
    font-size: var(--fs-md);
    color: var(--text-primary);
    font-family: var(--ff-phonetic);
  }
  .meanings__ru {
    font-size: var(--fs-sm);
    color: var(--text-secondary);
    font-family: var(--ff-phonetic);
  }
</style>
