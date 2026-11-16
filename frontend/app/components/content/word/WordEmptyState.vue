<script setup lang="ts">
  import AppTitle from '~/components/base/AppTitle.vue';
  import AppButton from '~/components/base/AppButton.vue';
  import AppContainer from '~/components/base/AppContainer.vue';

  interface WordEmptyStateProps {
    suggestions?: string[]
  }
  const emit = defineEmits<{
    pick: [word: string]
  }>();

  withDefaults(defineProps<WordEmptyStateProps>(), {
    suggestions: () => ['fancy', 'discrepancy', 'albeit'],
  });
</script>

<template>
  <div class="empty-state">
    <app-container>
      <div class="empty-state__body">
        <app-title>What word are we looking up?</app-title>

        <p class="empty-state__text">
          Meanings, collocations and real examples — with Russian translations.
        </p>

        <div class="try-words" role="group" aria-label="Try these words">
          <span class="try-words__label">Try:</span>

          <app-button
            v-for="word in suggestions"
            :key="word"
            secondary
            type="button"
            class="try-words__chip"
            @click="emit('pick', word)"
          >
            {{ word }}
          </app-button>
        </div>
      </div>
    </app-container>
  </div>
</template>

<style scoped>
  .empty-state {
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    text-align: center;
  }
  .empty-state__body {
    position: relative;
    isolation: isolate;
  }
  .empty-state__body::before {
    content: '';
    position: absolute;
    inset: -140px -180px;
    z-index: -1;
    pointer-events: none;
    background: radial-gradient(
      ellipse at center,
      color-mix(in srgb, var(--primary-muted) 70%, transparent) 0%,
      color-mix(in srgb, var(--primary-subtle) 50%, transparent) 40%,
      transparent 70%
    );
    filter: blur(20px);
  }
  .empty-state__text {
    margin-top: var(--space-xs);
    font-size: var(--fs-sm);
    color: var(--text-secondary);
  }
  .try-words {
    margin-top: var(--space-sm);
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>
