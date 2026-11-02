<script setup lang="ts">
  import { useNavItems } from '~/composables/useNavItems';
  import AppIcon from '~/components/base/AppIcon.vue';

  const items = useNavItems();
</script>

<template>
  <nav class="nav">
    <NuxtLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="nav__link"
      active-class="nav__link--active"
    >
      <app-icon 
        :name="item.icon"
        color="var(--text-secondary)"
        size="var(--fs-lg)"
      />
      {{ item.label }}
    </NuxtLink>
  </nav>
</template>

<style scoped>
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
  .nav__link {
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
  }
  .nav__link--active {
    background: var(--primary-subtle);
    border: 1px solid var(--primary-muted);
    border-radius: var(--radius-lg);
    color: var(--primary);
    transition: 
      background var(--transition-fast), 
      border-color var(--transition-fast), 
      box-shadow var(--transition-fast), 
      color var(--transition-fast);
  }
  .nav__link--active :deep(.icon path) {
    fill: var(--primary);
  }
</style>
