<script setup lang="ts">
  import { computed } from 'vue';
  import { useWordsStore } from '~/stores/wordsStore';
  import { normalizeWord } from '~/utils/normalize-word';
  import type { WordStatus } from '~/types/word-record.types';
  import AppButton from '~/components/base/AppButton.vue';

  const props = defineProps<{ word: string }>();

  const store = useWordsStore();

  const key = computed(() => normalizeWord(props.word));

  const status = computed(
    () => store.records.find((r) => r.word === key.value)?.status ?? null,
  );

  const STATUSES: { value: WordStatus; label: string }[] = [
    { value: 'learning', label: 'Learning' },
    { value: 'learned', label: 'Learned' },
  ];
</script>

<template>
  <div class="word-status">
    <div class="word-status__buttons">
      <app-button
        v-for="s in STATUSES"
        :key="s.value"
        type="button"
        class="word-status__button"
        :class="[
          `word-status__button--${s.value}`,
          { 'word-status__button--active': status === s.value },
        ]"
        :aria-pressed="status === s.value"
        @click="store.setStatus(key, s.value)"
      >
        {{ s.label }}
      </app-button>
    </div>

    <p v-if="!status" class="word-status__hint">Pick a status to save this word</p>
  </div>
</template>

<style scoped>
  .word-status {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .word-status__buttons {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .word-status__button {
    padding: 6px 12px;
    color: var(--text-secondary);
    background: transparent;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    transition: color var(--transition-fast), background-color var(--transition-fast), border-color var(--transition-fast);
  }
  .word-status__button:hover {
    color: var(--text-primary);
    border-color: var(--border-strong);
  }

  .word-status__button--learning {
    --status-color: var(--status-learning);
    --status-bg: var(--warning-subtle);
  }
  .word-status__button--learned {
    --status-color: var(--status-learned);
    --status-bg: var(--success-subtle);
  }

  .word-status__button--active,
  .word-status__button--active:hover {
    color: var(--status-color);
    background: var(--status-bg);
    border-color: var(--status-color);
  }

  .word-status__hint {
    font-size: var(--fs-xs);
    color: var(--text-secondary);
  }
</style>
