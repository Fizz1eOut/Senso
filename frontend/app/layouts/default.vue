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
    grid-template-columns: 200px 1fr;
    height: 100dvh;
  }
  .layout__main {
    min-height: 100dvh;
    overflow-y: auto;
    overflow-x: hidden;
  }

  @media (max-width: 768px) {
    .layout {
      grid-template-columns: 1fr;
      height: 100%;
    }
    .layout__main {
      padding-bottom: 80px;
    }
  }
</style>
