<script setup lang="ts">
  import WordLoaderBone from '~/components/content/word-loader/WordLoaderBone.vue';

  const items = [
    { pattern: '46%', example: '92%', ru: '70%' },
    { pattern: '58%', example: '84%', ru: '62%' },
  ];
</script>

<template>
  <div class="word-loader__meaning">
    <div v-for="(m, i) in items" :key="i" class="word-loader__item">
      <word-loader-bone :width="m.pattern" />
      <word-loader-bone :width="m.example" :height="12" />
      <word-loader-bone :width="m.ru" :height="10" />
    </div>
  </div>
</template>

<style scoped>
  .word-loader__meaning {
    display: grid;
    gap: var(--space-md);
    padding-left: var(--space-md);
    border-left: 2px solid var(--border-strong);
  }
  .word-loader__item {
    display: grid;
    gap: 6px;
  }
</style>
