<script setup lang="ts">
  import { COPY } from '~/constants/word-loader';

  defineProps<{ 
    progress: number; slow: boolean 
  }>();
</script>

<template>
  <div class="word-loader__bar">
    <div 
      class="word-loader__fill" 
      :style="{ width: `${progress}%` }" 
    />
  </div>
  <p class="word-loader__caption">{{ COPY.caption }}</p>

  <div class="word-loader__note-wrap" :class="{ show: slow }">
    <div class="word-loader__note-clip">
      <p class="word-loader__note">{{ COPY.slow }}</p>
    </div>
  </div>
</template>

<style scoped>
  .word-loader__bar {
    height: 3px;
    margin-top: var(--space-lg);
    border-radius: 3px;
    background: var(--border);
    overflow: hidden;
  }
  .word-loader__fill {
    position: relative;
    height: 100%;
    border-radius: 3px;
    background: var(--gradient-brand);
    transition: width var(--dur-slow) var(--ease-out);
  }
  .word-loader__fill::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
    transform: translateX(-100%);
    animation: shine 1.8s ease-in-out infinite;
  }
  @keyframes shine { 
    to { 
      transform: translateX(100%); 
    } 
  }

  .word-loader__caption {
    margin: var(--space-xs) 0 0;
    font-size: var(--fs-sm);
    color: var(--text-secondary);
  }

  .word-loader__note-wrap {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--transition-slow);
  }
  .word-loader__note-wrap.show { grid-template-rows: 1fr; }
  .word-loader__note-clip { min-height: 0; overflow: hidden; }
  .word-loader__note {
    margin: var(--space-sm) 0 0;
    padding: var(--space-sm) var(--space-md);
    font-size: var(--fs-sm);
    line-height: 1.5;
    color: var(--text-secondary);
    background: var(--callout-bg);
    border: 1px solid var(--callout-border);
    border-radius: var(--radius-md);
  }

  @media (prefers-reduced-motion: reduce) {
    .word-loader__fill::after { 
      animation: none; 
    }
  }
</style>
