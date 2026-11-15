<script setup lang="ts">
  import { computed } from 'vue';

  interface LevelBadgeProps {
    level: string | null | undefined
  }
  const props = defineProps<LevelBadgeProps>();

  const LEVELS = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'] as const;

  export type Level = typeof LEVELS[number];


  const normalized = computed(() => {
    const value = props.level?.trim().toLowerCase();
    return LEVELS.find((item) => item === value) ?? null;
  });
</script>

<template>
  <span
    v-if="normalized"
    class="level-badge"
    :style="{ '--level-color': `var(--level-${normalized})` }"
  >
    {{ normalized.toUpperCase() }}
  </span>
</template>

<style scoped>
  .level-badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border: 1px solid color-mix(in srgb, var(--level-color) 35%, transparent);
    border-radius: 999px;
    background: color-mix(in srgb, var(--level-color) 15%, transparent);
    color: var(--level-color);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
  }
</style>
