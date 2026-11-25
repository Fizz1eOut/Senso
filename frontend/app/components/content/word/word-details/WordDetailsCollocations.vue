<script setup lang="ts">
  import type { DictionaryEntry } from '~/types/word.types';
  import AppSubtitle from '~/components/base/AppSubtitle.vue';
 
  interface WordDetailsCollocationsProps {
    entry: DictionaryEntry
  }
  defineProps<WordDetailsCollocationsProps>();
</script>

<template>
  <div class="collocations">
    <app-subtitle>Collocations</app-subtitle>

    <ul class="collocations__list">
      <li
        v-for="(item, index) in entry.collocations"
        :key="index"
        class="collocations__item"
      >
        <div class="collocations__phrase">{{ item.phrase }}</div>
        <div class="collocations__translation">{{ item.translation }}</div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .collocations__list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: var(--space-sm);
  }
  .collocations__item {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 12px 16px;
    background-color: var(--bg-surface-2);
    border-radius: var(--radius-lg);
  }
  .collocations__phrase {
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    color: var(--text-primary);
    font-family: var(--ff-phonetic);
  }
  .collocations__translation {
    font-size: var(--fs-xs);
    color: var(--text-secondary);
    font-family: var(--ff-phonetic);
  }
</style>
