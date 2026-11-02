<script setup lang="ts">
  import AppSidebar from '@/components/base/AppSidebar.vue';
  import AppTabBar from '@/components/base/AppTabBar.vue';
</script>

<template>
  <div class="layout">
    <AppSidebar />
    <AppTabBar />

    <main class="layout__main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
  .layout {
    display: grid;
    grid-template-columns: 230px 1fr;
    height: 100dvh;
  }
  .layout__main {
    min-width: 0;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    .layout {
      grid-template-columns: 1fr;
    }
    .layout__main {
      padding-bottom: calc(var(--tab-bar-height, 56px) + env(safe-area-inset-bottom));
    }
  }
</style>
