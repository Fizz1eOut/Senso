<script setup lang="ts">
  import type { DictionaryEntry } from '~/types/word.types';
  import { useSpeak } from '@/composables/useSpeak';
  import AppSubtitle from '~/components/base/AppSubtitle.vue';
  import AppButton from '~/components/base/AppButton.vue';
  import AppIcon from '~/components/base/AppIcon.vue';
 
  interface WordDetailsExamplesProps {
    entry: DictionaryEntry
  }
  defineProps<WordDetailsExamplesProps>();

  const { play, isPlaying } = useSpeak();
</script>

<template>
  <div class="examples">
    <app-subtitle>Examples</app-subtitle>

    <ul class="examples__list">
      <li
        v-for="(example, index) in entry.examples"
        :key="index"
        class="examples__item"
      >
        <div class="examples__index">{{ index + 1 }}</div> 
        <div class="examples__content">
          <div class="examples__example">
            <div class="examples__pattern">{{ example.en }}</div>
            <app-button
              type="button"
              class="examples__speak icon-button"
              :disabled="isPlaying"
              :aria-label="`Listen to the example ${entry.word}`"
              @click="play(example.en)"
            >
              <app-icon 
                name="speaker"
                color="var(--text-secondary)"
                size="var(--fs-md)"
              />
            </app-button>
          </div>
          <p class="examples__translation">— {{ example.ru }}</p>
        </div>

      </li>
    </ul>
  </div>
</template>

<style scoped>
  .examples__index {
    margin-top: 2px;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: var(--fs-sm);
    color: var(--text-secondary);
    background-color: var(--bg-surface-3);
    border-radius: var(--radius-full);
  }
  .examples__list {
    margin-top: var(--space-xs);
  }
  .examples__item {
    display: flex;
    gap: 10px;
  }
  .examples__item:not(:last-child) {
    margin-bottom: var(--space-sm)
  }
  .examples__content {
    display: flex;
    flex-direction: column;
  }
  .examples__example {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .icon-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    transition: background-color var(--transition-base);
    border-radius: var(--radius-full);
  }
  .icon-button:hover {
    background-color: var(--bg-surface-3);
  }
  .examples__pattern {
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    color: var(--text-primary);
    font-family: var(--ff-phonetic);
  }
  .examples__translation {
    font-size: var(--fs-sm);
    color: var(--text-secondary);
    font-family: var(--ff-phonetic);
  }
</style>
