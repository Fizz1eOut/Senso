<script setup lang="ts">
  import { computed } from 'vue';
  import WordLoaderBone from '~/components/content/word-loader/WordLoaderBone.vue';

  const props = defineProps<{ word: string; solidTags: boolean; finishing: boolean }>();

  const TAG_WIDTHS = [36, 78, 62];
  const ACTION_WIDTHS = [84, 76, 80];
  const FREQ_DOTS = 10;

  const chars = computed(() =>
    Array.from(props.word.trim()).map((c) => (c === ' ' ? '\u00A0' : c)),
  );
</script>

<template>
  <header class="word-loader__head" :class="{ finishing }">
    <h2 class="word-loader__word">
      <span
        v-for="(ch, i) in chars" 
        :key="i" 
        class="word-loader__char"
        :style="{ '--i': i }"
      >
        {{ ch }}
      </span>
    </h2>

    <div class="word-loader__ipa-row">
      <word-loader-bone :width="96" />
      <word-loader-bone shape="circle" :width="14" :height="14" />
    </div>

    <word-loader-bone
      class="word-loader__translation" 
      :width="220" 
      :height="22"
      :solid="solidTags" 
    />

    <div class="word-loader__tags">
      <div class="word-loader__tag-list">
        <word-loader-bone
          v-for="w in TAG_WIDTHS" :key="w"
          shape="pill" :width="w" :height="22"
          :solid="solidTags" />
      </div>
      <div class="word-loader__freq">
        <span class="word-loader__freq-label">freq</span>
        <i
          v-for="n in FREQ_DOTS" 
          :key="n" 
          class="dot"
          :style="{ '--i': n }" 
        />
      </div>
    </div>

    <div class="word-loader__actions">
      <span
        v-for="w in ACTION_WIDTHS" :key="w" class="word-loader__action"
        :style="{ width: w + 'px' }" />
    </div>
  </header>
</template>

<style scoped>
  .word-loader__word {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    font-family: var(--ff-display);
    font-size: var(--fs-4xl);
    font-weight: var(--fw-bold);
    line-height: 1.15;
    letter-spacing: -0.01em;
  }
  .word-loader__char {
    display: inline-block;
    animation: wave 1.8s ease-in-out infinite;
    animation-delay: calc(var(--i) * 90ms);
  }
  @keyframes wave {
    0%, 100% { 
      transform: translateY(0); 
      opacity: 0.5; 
    }
    50% { 
      transform: translateY(-5px); 
      opacity: 1; }
  }

  .word-loader__ipa-row { 
    display: flex; 
    align-items: center;
    gap: var(--gap-sm); 
    margin-top: var(--space-xs); 
  }
  .word-loader__translation { 
    margin-top: var(--space-sm); 
  }
  .word-loader__tags {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--gap-md);
    margin-top: var(--space-sm);
  }
  .word-loader__tag-list { 
    display: flex; 
    gap: var(--gap-sm); 
  }

  .word-loader__freq {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: var(--fs-xs);
    color: var(--text-muted);
  }
  .word-loader__freq-label { 
    margin-right: 5px;
   }
  .dot {
    width: 5px;
    height: 5px;
    border-radius: var(--radius-full);
    background: var(--border-strong);
    animation: dot 1.6s ease-in-out infinite;
    animation-delay: calc(var(--i) * 90ms);
  }
  .finishing .dot { 
    animation: none;
   }
  
  @keyframes dot {
    0%, 100% { 
      background: var(--border-strong); 
      transform: scale(1); 
    }
    40% { 
      background: var(--primary); 
      transform: scale(1.35); 
    }
  }

  .word-loader__actions { 
    display: flex;
    gap: var(--gap-sm);
    margin-top: var(--space-sm);
  }
  .word-loader__action {
    height: 32px;
    border: 1px solid var(--border);
    border-radius: 999px;
    opacity: 0.7;
  }

  @media (prefers-reduced-motion: reduce) {
    .ch, .dot {
      animation: none;
    }
  }
</style>
