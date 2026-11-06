<script setup lang="ts">
  import { COPY, type WordPair } from '~/composables/word-loader.constants';
  import AppIcon from '~/components/base/AppIcon.vue';

  defineProps<{ 
    pair: WordPair 
  }>();
</script>

<template>
  <div class="word-loader__pair">
    hello the pair is here
    <span class="word-loader__pair-label">{{ COPY.pairLabel }}</span>
    <Transition name="swap" mode="out-in">
      <div :key="pair.en" class="word-loader__pair-row">
        <b>{{ pair.en }}</b>
        <div class="word-loader__arrow">
          <app-icon 
            name="arrow"
            size="var(--fs-lg)"
            color="var(--primary)"
          />
        </div>
        <span class="word-loader__ru">{{ pair.ru }}</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
  .word-loader__pair {
    min-height: 64px;
    margin-top: var(--space-xl);
    padding-top: var(--space-md);
    border-top: 1px solid var(--border);
  }
  .word-loader__pair-label {
    display: block;
    margin-bottom: var(--gap-xs);
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-muted);
  }
  .word-loader__pair-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--gap-sm);
    font-size: var(--fs-md);
  }
  .word-loader__arrow {
    width: var(--fs-md);
    height: var(--fs-md);
  }
  .word-loader__pair-row b {
    font-family: var(--ff-display);
    font-weight: var(--fw-semibold);
    color: var(--text-primary);
  }
  .word-loader__ru { 
    color: var(--text-translation);
  }

  .swap-enter-active, .swap-leave-active {
    transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out);
  }
  .swap-enter-from { 
    opacity: 0; 
    transform: translateY(8px);
  }
  .swap-leave-to { 
    opacity: 0; 
    transform: translateY(-8px);
  }
</style>
