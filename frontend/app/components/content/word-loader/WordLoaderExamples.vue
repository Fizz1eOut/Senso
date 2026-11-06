<script setup lang="ts">
  import WordLoaderBone from '~/components/content/word-loader/WordLoaderBone.vue';

  const LINE_WIDTHS = ['94%', '86%', '68%'];
</script>

<template>
  <div class="word-loader__examples">
    <div v-for="w in LINE_WIDTHS" :key="w" class="ex">
      <i class="bullet" />
      <WordLoaderBone class="line" :width="w" />
    </div>
  </div>
</template>

<style scoped>
  .word-loader__examples { 
    display: grid;
    gap: var(--gap-md);
   }
  .ex { 
    display: flex; 
    align-items: center; 
    gap: var(--gap-sm); 
  }
  .line { 
    flex: none;
  }
  .bullet {
    width: 4px;
    height: 4px;
    flex: none;
    border-radius: var(--radius-full);
    background: var(--text-muted);
  }
</style>
