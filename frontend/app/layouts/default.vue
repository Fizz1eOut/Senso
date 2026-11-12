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

  @media (max-width: 768px) {
    .layout {
      grid-template-columns: 1fr;
      height: 100%;
    }
  }
</style>
