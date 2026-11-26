<script setup lang="ts">
  import AppButton from '~/components/base/AppButton.vue';
  import AppUnderlay from '~/components/base/AppUnderlay.vue';
  import AppContainer from '~/components/base/AppContainer.vue';
  import AppIcon from '~/components/base/AppIcon.vue';
  import AppLevelBadge from '~/components/base/AppLevelBadge.vue';
  import type { WordRecord } from '~/types/word-record.types';
  import { formatTime } from '~/utils/format-time';
  import { useWordsStore } from '~/stores/wordsStore';

  interface WordMiniCardProps {
    record: WordRecord
    time?: boolean
  }
  defineProps<WordMiniCardProps>();

  const emit = defineEmits<{
    (e: 'select', word: string): void 
  }>();

  const store = useWordsStore();
</script>

<template>
  <div class="mini-card">
    <app-underlay size="lg">
      <app-container>
        <app-button type="button" class="mini-card__group" @click="emit('select', record.word)">
          <div class="mini-card__head">
            <div class="mini-card__row">
              <div class="mini-card__word">{{ record.entry.word }}</div>
              <app-level-badge :level="record.entry.level" />
            </div>
            <div class="mini-card__favorites" @click.stop="store.toggleFavorite(record.word)">
              <app-icon 
                :name="record.status === 'learning' ? 'star-full' : 'star'"
                :color="record.status === 'learning' ?  'var(--favorite)' : 'var(--text-secondary)'"
                size="var(--space-md)"
              />
            </div>
          </div>
          <div class="mini-card__content">
            <div class="mini-card__translation">{{ record.entry.shortTranslation }}</div>
            <div v-if="time" class="mini-card__time">{{ formatTime(record.searchedAt) }}</div>
          </div>
        </app-button>
      </app-container>
    </app-underlay>
  </div>
</template>

<style scoped>
  .mini-card {
    transition: transform var(--transition-base);
  }
  .mini-card:hover {
    transform: scale(1.02);
  }
  .mini-card__group {
    min-height: 80px;
  }
  .mini-card__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .mini-card__row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .mini-card__word {
    text-align: start;
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    color: var(--text-primary);
  }
  .mini-card__favorites {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    transition: background-color var(--transition-base);
    border-radius: var(--radius-full);
  }
  .mini-card__favorites:hover {
    background-color: var(--bg-surface-3);
  }
  .mini-card__content {
    margin-top: var(--space-sm);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .mini-card__translation {
    text-align: start;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-secondary);
  }
</style>
