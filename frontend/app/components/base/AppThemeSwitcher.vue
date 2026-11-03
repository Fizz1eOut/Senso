<script setup lang="ts">
  import { computed } from 'vue';
  import { useThemeStore } from '~/stores/themeStore';
  import AppButton from '~/components/base/AppButton.vue';
  import AppUnderlay from '~/components/base/AppUnderlay.vue';
  import AppIcon from '~/components/base/AppIcon.vue';

  withDefaults(
    defineProps<{
      size?: 'small' | 'full'
    }>(),
    {
      size: 'small',
    }
  );

  const themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ] as const;

  const themeStore = useThemeStore();
  const toggleTheme = themeStore.toggleTheme;

  const iconName = computed(() =>
    themeStore.theme === 'light' ? 'moon' : 'sun'
  );
</script>

<template>
  <app-underlay>
    <div class="theme-switcher" @click="toggleTheme">
      <app-button class="theme-switcher__button">
        <app-icon
          :name="iconName"
          size="24px"
          color="var(--text-secondary)"
        />
      </app-button>
      <ul v-if="size === 'full'" class="theme-switcher__list">
        <li
          v-for="item in themes"
          :key="item.value"
          class="theme-switcher__text"
          :class="{ 'theme-switcher__text--active': themeStore.theme === item.value }"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </app-underlay>
</template>

<style scoped>
  .theme-switcher {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .theme-switcher__button {
    border: 1px solid var(--border);
    border-radius: var(--radius-full);
    width: 42px;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .theme-switcher__list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
    width: 70%;
    height: 40px;
    border-radius: var(--radius-lg);
    background-color: var(--bg-surface-2);
  }
  .theme-switcher__text {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
    border-radius: var(--radius-lg);
    color: var(--text-secondary);
    cursor: pointer;
    transition: background-color var(--transition-fast), color var(--transition-fast);
  }
  .theme-switcher__text--active {
    background-color: var(--bg-base);
    color: var(--text-primary);
  }

  @media (max-width: 400px) {
    .theme-switcher__button {
      width: 36px;
      height: 40px;
    }
  }
</style>
