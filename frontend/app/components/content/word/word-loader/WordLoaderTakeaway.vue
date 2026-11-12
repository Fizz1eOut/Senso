<script setup lang="ts">
  import WordLoaderBone from '~/components/content/word/word-loader/WordLoaderBone.vue';
</script>

<template>
  <div class="word-loader__callout">
    <word-loader-bone
      class="word-loader__bulb" 
      shape="circle" 
      :width="16"
      :height="16" 
    />
    <div class="word-loader__callout-lines">
      <word-loader-bone width="96%" />
      <word-loader-bone width="88%" />
      <word-loader-bone width="52%" />
    </div>
  </div>
</template>

<style scoped>
  .word-loader__callout {
    display: flex;
    gap: var(--gap-md);
    padding: var(--space-md);
    background: var(--callout-bg);
    border: 1px solid var(--callout-border);
    border-radius: var(--radius-md);
  }
  .word-loader__bulb { 
    flex: none;
  }
  .word-loader__callout-lines { 
    flex: 1; 
    display: grid;
    gap: var(--gap-sm);
  }
</style>
