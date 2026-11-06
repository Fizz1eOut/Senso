<script setup lang="ts">
  import type { SectionState } from '~/composables/word-loader.constants';

  defineProps<{
    label: string;
    index: number;
    state: SectionState;
    finishing: boolean;
  }>();
</script>

<template>
  <section class="word-loader__section" :class="state" :style="{ '--i': index }">
    <div class="word-loader__label">
      <span class="word-loader__mark">
        <svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      </span>
      <span>{{ label }}</span>
      <span v-if="state === 'active' && !finishing" class="word-loader__dots"><i /><i /><i /></span>
    </div>

    <div class="word-loader__shape"><slot /></div>
  </section>
</template>

<style scoped>
  .word-loader__section {
    margin-top: var(--space-lg);
    animation: rise var(--dur-slow) var(--ease-out) both;
    animation-delay: calc(var(--i) * var(--stagger-step) * 2);
  }
  @keyframes rise {
    from { 
      opacity: 0; 
      transform: translateY(8px);
    }
    to { 
      opacity: 1; 
      transform: none;
    }
  }

  .section.pending { 
    --bone-play: paused;
  }
  .section.done {
    --bone-play: paused;
    --bone-bg: color-mix(in srgb, var(--primary) 12%, var(--skeleton-base));
  }

  .word-loader__shape { 
    transition: opacity var(--transition-slow); 
  }
  .pending .word-loader__shape { 
    opacity: 0.5;
  }

  .word-loader__label {
    display: flex;
    align-items: center;
    gap: var(--gap-sm);
    margin-bottom: var(--space-sm);
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-muted);
    transition: color var(--transition-base);
  }
  .active .word-loader__label {
    color: var(--text-primary); 
  }
  .done .word-loader__label { 
    color: var(--text-secondary); 
  }

  .word-loader__mark {
    position: relative;
    width: 14px;
    height: 14px;
    flex: none;
    display: grid;
    place-items: center;
    border: 1.5px solid var(--border-strong);
    border-radius: var(--radius-full);
    transition: background var(--transition-base), border-color var(--transition-base);
  }
  .word-loader__mark svg {
    width: 9px;
    height: 9px;
    fill: none;
    stroke: var(--bg-base);
    stroke-width: 4;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 24;
    stroke-dashoffset: 24;
    transition: stroke-dashoffset var(--transition-slow) ease-out;
  }
  .done .word-loader__mark { 
    background: var(--success); 
    border-color: var(--success);
  }
  .done .word-loader__mark svg { 
    stroke-dashoffset: 0;
  }
  .active .word-loader__mark {
    border-color: transparent;
  }
  .active .word-loader__mark::after {
    content: '';
    position: absolute;
    inset: -1.5px;
    border: 1.5px solid transparent;
    border-top-color: var(--primary);
    border-right-color: var(--primary);
    border-radius: var(--radius-full);
    animation: rot 0.9s linear infinite;
  }
  @keyframes rot { to { transform: rotate(360deg); } }

  .word-loader__dots { 
    display: inline-flex; 
    gap: 3px;
  }
  .word-loader__dots i {
    width: 3px;
    height: 3px;
    border-radius: var(--radius-full);
    background: var(--primary);
    animation: blink 1.2s infinite;
  }
  .word-loader__word-loader__dots i:nth-child(2) { 
    animation-delay: 0.2s;
  }
  .word-loader__dots i:nth-child(3) { 
    animation-delay: 0.4s;
  }
  @keyframes blink {
    0%, 80%, 100% { 
      opacity: 0.2;
    }
    40% { 
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .section, .active .word-loader__mark::after, .word-loader__dots i { 
      animation: none; 
    }
  }
</style>
