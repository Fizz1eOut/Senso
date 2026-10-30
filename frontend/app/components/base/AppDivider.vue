<script setup lang="ts">
  withDefaults(
    defineProps<{
      orientation?: 'horizontal' | 'vertical'
    }>(),
    {
      orientation: 'horizontal',
    }
  );
</script>

<template>
  <div
    class="divider"
    :class="`divider--${orientation}`"
  />
</template>

<style scoped>
  .divider {
    background-color: var(--border);
  }
  .divider--horizontal {
    width: 100%;
    height: 1px;
    margin: var(--space-md) 0;
  }
  .divider--vertical {
    width: 1px;
    height: 100%;
    margin: 0 var(--space-md);
  }
</style>
