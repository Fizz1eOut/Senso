<script setup lang="ts">
  import WordLoaderBone from '~/components/content/word-loader/WordLoaderBone.vue';
</script>

<template>
  <div class="word-loader__meaning">
    <word-loader-bone width="46%" />
    <word-loader-bone width="72%" />
    <word-loader-bone class="word-loader__spaced" width="92%" />
    <word-loader-bone width="78%" />
  </div>
</template>

<style scoped>
  .word-loader__meaning {
    display: grid;
    gap: var(--gap-sm);
    padding-left: var(--space-md);
    border-left: 2px solid var(--border-strong);
  }
  .word-loader__spaced { 
    margin-top: var(--gap-sm);
  }
</style>
