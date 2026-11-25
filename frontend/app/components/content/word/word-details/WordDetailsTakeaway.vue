<script setup lang="ts">
  import type { DictionaryEntry } from '~/types/word.types';
  import AppContainer from '~/components/base/AppContainer.vue';
  import AppSubtitle from '~/components/base/AppSubtitle.vue';
  import AppIcon from '~/components/base/AppIcon.vue';
 
  interface WordDetailsTakeawayProps {
    entry: DictionaryEntry
  }
  defineProps<WordDetailsTakeawayProps>();
</script>

<template>
  <div class="takeaway">
    <app-container size="sm">
      <div class="takeaway__row">
        <app-icon 
          name="bulb"
          size="var(--fs-xl)"
          color="var(--primary)"
        />
        <app-subtitle>Key takeaway</app-subtitle>
      </div>

      <p class="takeaway__text">{{ entry.keyTakeaway }}</p>
    </app-container>
  </div>
</template>

<style scoped>
  .takeaway {
    background:
      radial-gradient(120% 120% at 0% 0%, rgba(255, 107, 74, 0.08), transparent 60%),
      var(--callout-bg);
    border: 1px solid var(--callout-border);
    border-radius: var(--radius-lg);
  }
  .takeaway__row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: var(--space-sm);
  }
  .takeaway__text {
    font-size: var(--fs-md);
    color: var(--text-primary);
  }
  :deep(.title) {
    color: var(--primary);
    font-size: var(--fs-lg);
  }
</style>
