import { defineStore } from 'pinia';

export type Theme = 'light' | 'dark';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'dark' as Theme,
  }),

  actions: {
    setTheme(theme: Theme) {
      this.theme = theme;

      const html = document.documentElement;
      html.classList.toggle('light', theme === 'light');

      localStorage.setItem('theme', theme);
    },

    toggleTheme() {
      const newTheme = this.theme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
    },

    loadTheme() {
      const saved = localStorage.getItem('theme') as Theme | null;
      this.setTheme(saved || 'dark');
    },
  },
});
