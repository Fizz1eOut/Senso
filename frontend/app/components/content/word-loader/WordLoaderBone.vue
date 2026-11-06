<script setup lang="ts">
  import { computed } from 'vue';

  const props = withDefaults(
    defineProps<{
      width?: number | string;
      height?: number | string;
      shape?: 'line' | 'pill' | 'circle';
      solid?: boolean;
    }>(),
    { width: undefined, height: 14, shape: 'line', solid: false },
  );

  const toCss = (v?: number | string) => (typeof v === 'number' ? `${v}px` : v);
  const style = computed(() => ({ width: toCss(props.width), height: toCss(props.height) }));
</script>

<template>
  <span class="word-loader__bone" :class="[shape, { solid }]" :style="style" />
</template>

<style scoped>
  .word-loader__bone {
    display: block;
    background: var(
      --bone-bg,
      linear-gradient(
        90deg,
        var(--skeleton-base) 25%,
        var(--skeleton-highlight) 50%,
        var(--skeleton-base) 75%
      )
    );
    background-size: 200% 100%;
    animation: bone-shimmer 1.4s linear infinite;
    animation-play-state: var(--bone-play, running);
  }
  @keyframes bone-shimmer {
    from { 
      background-position: 200% 0; 
    }
    to { 
      background-position: -200% 0; 
    }
  }

  .line { 
    border-radius: var(--radius-sm); 
  }
  .pill { 
    border-radius: 999px; 
  }
  .circle { 
    border-radius: var(--radius-full); 
  }

  .solid {
    animation: none;
    background: color-mix(in srgb, var(--primary) 16%, var(--skeleton-base));
  }

  @media (prefers-reduced-motion: reduce) {
    .word-loader__bone { animation: none; }
  }
</style>
