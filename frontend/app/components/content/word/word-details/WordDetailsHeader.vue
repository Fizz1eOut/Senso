<script setup lang="ts">
  import { computed } from 'vue';
  import { useSpeak } from '@/composables/useSpeak';
  import { useWordsStore } from '~/stores/wordsStore';
  import { normalizeWord } from '~/utils/normalize-word';
  import type { DictionaryEntry } from '~/types/word.types';
  import AppIcon from '~/components/base/AppIcon.vue';
  import AppButton from '~/components/base/AppButton.vue';
  import AppLevelBadge from '~/components/base/AppLevelBadge.vue';
  import WordFrequency from '~/components/content/word/WordFrequency.vue';
  import WordStatus from '~/components/content/word/WordStatus.vue';

  interface WordDetailsProps {
    entry: DictionaryEntry
  }
  const props = defineProps<WordDetailsProps>();

  const { play, isPlaying } = useSpeak();
  const store = useWordsStore();

  const key = computed(() => normalizeWord(props.entry.word));

  const status = computed(
    () => store.records.find((r) => r.word === key.value)?.status ?? null,
  ); 
</script>

<template>
  <div class="word-details-header">
    <div class="word-details-header__item">
      <div class="word-details-header__title">
        {{ entry.word }}
      </div>

      <div class="word-details-header__actions">
        <app-button class="word-details-header__favorite icon-button" @click="store.toggleFavorite(key)">
          <app-icon
            :name="status === 'learning' ? 'star-full' : 'star'"
            :color="status === 'learning' ? 'var(--favorite)' : 'var(--text-secondary)'"
            size="var(--space-lg)"
          />
        </app-button>

        <app-button class="word-details-header__close icon-button">
          <app-icon
            name="cross"
            color="var(--text-secondary)"
            size="var(--space-md)"
          />
        </app-button>
      </div>
    </div>

    <div class="word-details-header__row">
      <app-button
        type="button"
        class="word-details-header__speak icon-button"
        :disabled="isPlaying"
        :aria-label="`Listen to the word ${entry.word}`"
        @click="play(entry.word, entry.audioUrl)"
      >
        <app-icon 
          name="speaker"
          color="var(--text-secondary)"
          size="var(--space-lg)"
        />
      </app-button>

      <div v-if="entry.transcription" class="word-details-header__ipa">
        {{ entry.transcription }}
      </div>
    </div>

    <div class="word-details-header__translation">
      {{ entry.shortTranslation }}
    </div>

    <div class="word-details-header__info">
      <div class="word-details-header__group">
        <app-level-badge :level="entry.level" />
        <div class="word-details-header__style">Style: {{ entry.style }}</div>
      </div>
      <word-frequency :frequency="entry.frequency" /> 
    </div>

    <word-status :word="entry.word" />
  </div>
</template>

<style scoped>
  .icon-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    transition: background-color var(--transition-base);
    border-radius: var(--radius-full);
  }
  .icon-button:hover {
    background-color: var(--bg-surface-3);
  }

  .word-details-header__title {
    font-size: var(--space-xl);
    font-weight: var(--fw-semibold);
  }
  .word-details-header__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .word-details-header__actions {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .word-details-header__row {
    display: flex;
    align-items: center;
  }
  .word-details-header__ipa {
    font-size: var(--space-md);
    font-weight: var(--fw-medium);
    color: var(--text-secondary);
  }
  .word-details-header__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: var(--space-xs)
  }
  .word-details-header__translation {
    margin-top: var(--space-xs);
    font-size: var(--space-md);
    font-weight: var(--fw-medium);
    color: var(--text-primary);
    font-family: var(--ff-phonetic);
  }
  .word-details-header__group {
    margin-top: var(--space-xs);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .word-details-header__style {
    font-size: var(--space-sm);
    font-weight: var(--fw-medium);
    color: var(--text-secondary);
    border: 1px solid var(--border);
    padding: 4px 8px;
    border-radius: var(--radius-lg);
    background-color: var(--bg-surface-3);
  }
</style>
