<script setup lang="ts">
  import { computed } from 'vue';

  const props = withDefaults(
    defineProps<{
      size?: 'sm' | 'md' | 'lg' | 'xl';
    }>(),
    {
      size: 'sm',
    }
  );

  const underlay = computed(() => `size-${props.size}`);
</script>

<template>
  <div :class="underlay" class="underlay">
    <slot />
  </div>
</template>

<style scoped>
  .underlay {
    background-color: var(--bg-surface);  
  }
  .size-full {
    border-radius: var(--radius-full);
  }
  .size-lg {
   border-radius: var(--radius-lg);
  }
  .size-md {
    border-radius: var(--radius-md);
  }
  .size-sm {
    border-radius: var(--radius-sm);
  }
</style>
