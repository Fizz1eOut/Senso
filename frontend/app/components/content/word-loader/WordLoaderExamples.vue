<script setup lang="ts">
  import WordLoaderBone from '~/components/content/word-loader/WordLoaderBone.vue';

  const items = [
    { en: '80%', ru: '54%' },
    { en: '72%', ru: '48%' },
    { en: '56%', ru: '38%' },
  ];
</script>

<template>
  <div class="word-loader__examples">
    <div v-for="(item, i) in items" :key="i" class="ex">
      <div class="en-row">
        <i class="bullet" />
        <word-loader-bone class="en" :width="item.en" />
        <word-loader-bone
          class="speaker" shape="circle" :width="14"
          :height="14" />
      </div>
      <word-loader-bone class="ru" :width="item.ru" :height="10" />
    </div>
  </div>
</template>

<style scoped>
  .word-loader__examples {
    display: grid;
    gap: var(--gap-md);
  }
  .ex {
    display: grid;
    gap: 6px;
  }
  .en-row {
    display: flex;
    align-items: center;
    gap: var(--gap-sm);
  }
  .en {
    flex: 0 1 auto;
  }
  .speaker {
    flex: none;
  }
  .ru {
    margin-left: calc(4px + var(--gap-sm));
  }
  .bullet {
    width: 4px;
    height: 4px;
    flex: none;
    border-radius: var(--radius-full);
    background: var(--text-muted);
  }
</style>
