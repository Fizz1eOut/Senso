<script setup lang="ts">
  import { useNavItems } from '~/composables/useNavItems';
  import AppIcon from '~/components/base/AppIcon.vue';
  import AppContainer from '~/components/base/AppContainer.vue';
  import AppUnderlay from '~/components/base/AppUnderlay.vue';

  const items = useNavItems();
</script>

<template>
  <nav class="tab-bar">
    <app-underlay>
      <app-container>
        <div class="tag__body">
          <NuxtLink
            v-for="item in items" 
            :key="item.to" 
            :to="item.to"
            class="tab-bar__link"
            active-class="tab-bar__link--active"
          >
            <app-icon 
              :name="item.icon"
              color="var(--text-secondary)"
              size="var(--fs-lg)"
            />
            {{ item.label }}
          </NuxtLink>
        </div>
      </app-container>
    </app-underlay>
  </nav>
</template>

<style scoped>
  :deep(.underlay) {
    border-radius: 0;
  }

  .tab-bar { 
    border-top: 1px solid var(--border);
    display: none; 
    position: fixed; 
    inset: auto 0 0; 
  }
  .tag__body {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
  }
  .tab-bar__link {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    font-size: var(--fs-xs);
  }
  .tab-bar__link--active {
    color: var(--primary);
    transition: color var(--transition-fast);
  }
  .tab-bar__link--active :deep(.icon path) {
    fill: var(--primary);
  }

  @media (max-width: 768px) {
    .tab-bar { 
      display: block; 
    }
  }
</style>
