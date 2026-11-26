<script setup lang="ts">
  import { computed } from 'vue';

  const props = withDefaults(
    defineProps<{
      frequency: number
      max?: number
    }>(),
    { max: 10 }
  );

  const value = computed(() =>
    Math.min(Math.max(Math.round(props.frequency), 0), props.max)
  );
</script>

<template>
  <div
    class="frequency"
    role="meter"
    aria-label="Frequency"
    :aria-valuenow="value"
    aria-valuemin="0"
    :aria-valuemax="max"
  >
    <div class="frequency__dots">
      <span
        v-for="i in max"
        :key="i"
        class="frequency__dot"
        :class="{ 'frequency__dot--active': i <= value }"
      />
    </div>
    <span class="frequency__label">{{ value }}/{{ max }}</span>
  </div>
</template>

<style scoped>
  .frequency {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--text-secondary);
  }
  .frequency__dots {
    display: flex;
    align-items: center;
    gap: 3px;
  }
  .frequency__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--border-strong);
    transition: background-color var(--transition-base);
  }
  .frequency__dot--active {
    background: var(--primary);
  }
  .frequency__label {
    font-size: var(--fs-xs);
    color: var(--text-secondary);
  }
</style>
