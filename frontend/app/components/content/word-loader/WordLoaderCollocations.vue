<script setup lang="ts">
  import WordLoaderBone from '~/components/content/word-loader/WordLoaderBone.vue';

  const CARD_WIDTHS = [156, 132, 176];
</script>

<template>
  <div class="word-loader__cards">
    <div 
      v-for="w in CARD_WIDTHS" 
      :key="w" 
      class="word-loader__card" 
      :style="{ width: w + 'px' }"
    >
      <word-loader-bone width="78%" />
      <word-loader-bone width="100%" :height="10" />
    </div>
  </div>
</template>

<style scoped>
  .word-loader__cards { 
    display: flex; 
    flex-wrap: wrap;
    gap: var(--gap-sm);
  }
  .word-loader__card {
    display: grid;
    gap: 6px;
    max-width: 100%;
    padding: 10px 12px;
    background: var(--bg-surface-2);
    border-radius: var(--radius-md);
  }
</style>
