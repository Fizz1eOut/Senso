<script setup lang="ts">
  import { toRef } from 'vue';
  import { useWordSuggestions } from '~/composables/useWordSuggestions';
  import AppContainer from '~/components/base/AppContainer.vue';
  import AppUnderlay from '~/components/base/AppUnderlay.vue';
  import AppLevelBadge from '~/components/base/AppLevelBadge.vue';
  import type { WordSuggestion } from '~/types/word-suggestions.types';

  interface WordSearchSuggestionsProps {
    query: string
  }
  const props = defineProps<WordSearchSuggestionsProps>();

  const emit = defineEmits<{
    select: [word: string]
  }>();

  const { suggestions } = useWordSuggestions(toRef(props, 'query'));

  function onSelect(item: WordSuggestion) {
    emit('select', item.word);
  }
</script>

<template>
  <ul v-if="suggestions.length" class="word-search-suggestions suggestions">
    <app-underlay>
      <app-container>
        <li
          v-for="item in suggestions"
          :key="item.word"
          class="suggestions__item"
          @mousedown.prevent="onSelect(item)"
        >
          <app-container>
            <div class="suggestions__group">
              <div class="suggestions__row">
                <div class="suggestions__word">{{ item.word }}</div>
                <div v-if="item.shortTranslation" class="suggestions__translation">
                  {{ item.shortTranslation }}
                </div>
              </div>
              <app-level-badge :level="item.level" />
            </div>
          </app-container>
        </li>
      </app-container>
    </app-underlay>
  </ul>
</template>

<style scoped>
  .suggestions {
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-glow);
  }
  .suggestions__group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .suggestions__item:not(:last-child) {
    border-bottom: 1px solid var(--border);
  }
  .suggestions__row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .suggestions__word {
    font-size: var(--fs-sm);
    color: var(--text-primary);
  }
  .suggestions__translation {
    font-size: var(--fs-sm);
    color: var(--text-secondary);
  }
  :deep(.divider--horizontal) {
    margin: 0
  }
</style>
