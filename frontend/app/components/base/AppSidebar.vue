<script setup lang="ts">
  import AppNav from '~/components/base/AppNav.vue';
  import AppContainer from '~/components/base/AppContainer.vue';
  import AppUnderlay from '~/components/base/AppUnderlay.vue';
  import AppDivider from '~/components/base/AppDivider.vue';
</script>

<template>
  <div class="sidebar">
    <app-underlay>
      <app-container>
        <div class="sidebar__body">
          <div class="sidebar__top">
            <div class="sidebar__logo">
              <NuxtLink to="/">
                <div>Senso <span>EN · RU</span></div>
              </NuxtLink>
            </div>

            <app-divider />

            <app-nav />
          </div>

          <div class="sidebar__bottom">
            <app-divider />
            bottom
          </div>
        </div>
      </app-container>
    </app-underlay>
  </div>
</template>

<style scoped>
  :deep(.underlay),
  :deep(.container) {
    height: 100%;
    box-sizing: border-box;
  }

  .sidebar {
    height: 100dvh;
    border-right: 1px solid var(--border);
  }
  .sidebar__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .sidebar__logo {
    font-size: var(--fs-xl);
    font-weight: var(--fw-medium);
  }
  .sidebar__logo span {
    padding: 2px 4px;
    font-size: var(--fs-xs);
    color: var(--primary);
    background: var(--primary-subtle);
    border: 1px solid var(--primary-muted);
    border-radius: var(--radius-md);
  }
  @media (max-width: 768px) {
    .sidebar { 
      display: none; 
    }
  }
</style>
