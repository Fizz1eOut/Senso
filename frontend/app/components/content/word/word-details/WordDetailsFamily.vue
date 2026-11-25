<script setup lang="ts">
  import type { DictionaryEntry } from '~/types/word.types';
  import AppSubtitle from '~/components/base/AppSubtitle.vue';


  interface WordDetailsFamalyProps {
    entry: DictionaryEntry
  }
  defineProps<WordDetailsFamalyProps>();
</script>

<template>
  <div class="word-family">
    <app-subtitle>Word family</app-subtitle>

    <ul class="word-family__list">
      <li
        v-for="(item, index) in entry.wordFamily"
        :key="index"
        class="word-family__item"
      >
        <div class="word-family__pattern">{{ item.form }}</div>
        <div class="word-family__translation">{{ item.translation }}</div>
      </li>
    </ul>  
  </div>
</template>

<style scoped>
  .word-family__list {
    margin-top: var(--space-xs);
    display: flex;
    align-items: stretch;
    gap: 10px;
  }
  .word-family__item {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 12px 16px;
    background-color: transparent;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
  }
  .word-family__pattern {
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    color: var(--text-primary);
    font-family: var(--ff-phonetic);
  }
  .word-family__translation {
    font-size: var(--fs-sm);
    color: var(--text-secondary);
    font-family: var(--ff-phonetic);
  }
</style>
