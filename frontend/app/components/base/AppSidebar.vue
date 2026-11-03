<script setup lang="ts">
  import AppNav from '~/components/base/AppNav.vue';
  import AppContainer from '~/components/base/AppContainer.vue';
  import AppUnderlay from '~/components/base/AppUnderlay.vue';
  import AppDivider from '~/components/base/AppDivider.vue';
  import AppThemeSwitcher from '~/components/base/AppThemeSwitcher.vue';
</script>

<template>
  <div class="sidebar">
    <app-underlay>
      <app-container>
        <div class="sidebar__header header">
          <div class="sidebar__logo">
            <NuxtLink to="/">
              <div>Senso <span>EN · RU</span></div>
            </NuxtLink>
          </div>
          <div class="header__theme-switcher">
            <app-theme-switcher />
          </div>
        </div>
        <div class="sidebar__body">
          <div class="sidebar__nav">
            <app-divider />
            <app-nav />
          </div>

          <div class="sidebar__group">
            <app-divider />
            <div class="sidebar__theme-switcher">
              <app-theme-switcher size="full" />
            </div>
          </div>
        </div>
      </app-container>
    </app-underlay>
  </div>
</template>

<style scoped>
  :deep(.underlay) {
    height: 100%;
    box-sizing: border-box;
  }
  :deep(.container) {
    display: flex;
    flex-direction: column;
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
    flex: 1;
    min-height: 0;
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

  .sidebar__theme-switcher {
    display: block;
  }
  .header__theme-switcher {
    display: none;
  }

  @media (max-width: 768px) {
    .sidebar {
      width: 100%;
      height: fit-content;
      border-bottom: 1px solid var(--border);
    }
    .sidebar__body { 
      display: none; 
    }
    .sidebar__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }
    .header__theme-switcher {
      display: block;
    }
    .sidebar__theme-switcher {
      display: none;
    }
  }
</style>
