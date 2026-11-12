<script setup lang="ts">
  import WordLoaderBone from '~/components/content/word/word-loader/WordLoaderBone.vue';

  const groups = [
    { label: 64, hint: 84, items: [64, 72, 80], note: 0 },
    { label: 40, hint: 92, items: [86], note: 120 },
  ];
</script>

<template>
  <div class="word-loader__translations">
    <div v-for="(g, i) in groups" :key="i" class="word-loader__group">
      <div class="word-loader__head">
        <word-loader-bone :width="g.label" :height="12" />
        <word-loader-bone :width="g.hint" :height="10" />
      </div>

      <div class="word-loader__items">
        <template v-for="(w, j) in g.items" :key="j">
          <i v-if="j" class="word-loader__dot" />
          <word-loader-bone :width="w" :height="16" />
        </template>
        <word-loader-bone v-if="g.note" :width="g.note" :height="10" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .word-loader__translations {
    display: grid;
    gap: var(--space-md);
  }
  .word-loader__group {
    display: grid;
    gap: var(--gap-sm);
  }
  .word-loader__head {
    display: flex;
    align-items: center;
    gap: var(--gap-sm);
  }
  .word-loader__items {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--gap-sm);
  }
  .word-loader__dot {
    width: 3px;
    height: 3px;
    flex: none;
    border-radius: var(--radius-full);
    background: var(--text-muted);
  }
</style>
