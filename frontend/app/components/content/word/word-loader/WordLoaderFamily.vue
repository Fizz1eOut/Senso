<script setup lang="ts">
  import WordLoaderBone from '~/components/content/word/word-loader/WordLoaderBone.vue';

  const PILL_WIDTHS = [112, 144, 98];
</script>

<template>
  <div class="word-loader__pills">
    <word-loader-bone
      v-for="w in PILL_WIDTHS" 
      :key="w" shape="pill"
      :width="w" 
      :height="36" 
    />
  </div>
</template>

<style scoped>
  .word-loader__pills { 
    display: flex; 
    flex-wrap: wrap; 
    gap: var(--gap-sm); 
  }
</style>
