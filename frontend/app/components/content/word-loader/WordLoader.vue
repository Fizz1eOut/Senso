<script setup lang="ts">
  import { toRef, type Component } from 'vue';
  import WordLoaderCollocations from '~/components/content/word-loader/WordLoaderCollocations.vue';
  import WordLoaderExamples from '~/components/content/word-loader/WordLoaderExamples.vue';
  import WordLoaderFamily from '~/components/content/word-loader/WordLoaderFamily.vue';
  import WordLoaderHeader from '~/components/content/word-loader/WordLoaderHeader.vue';
  import WordLoaderMeanings from '~/components/content/word-loader/WordLoaderMeanings.vue';
  import WordLoaderPair from '~/components/content/word-loader/WordLoaderPair.vue';
  import WordLoaderProgress from '~/components/content/word-loader/WordLoaderProgress.vue';
  import WordLoaderSection from '~/components/content/word-loader/WordLoaderSection.vue';
  import WordLoaderTakeaway from '~/components/content/word-loader/WordLoaderTakeaway.vue';
  import { COPY, SECTIONS, type SectionKey } from '~/constants/word-loader.ts';
  import { useWordLoader } from '~/composables/useWordLoader.ts';
  import { useWordLoaderPairs } from '~/composables/useWordLoaderPairs.ts';

  const props = defineProps<{ word: string; ready?: boolean }>();
  const emit = defineEmits<{ complete: [] }>();

  const SHAPES: Record<SectionKey, Component> = {
    meanings: WordLoaderMeanings,
    collocations: WordLoaderCollocations,
    family: WordLoaderFamily,
    examples: WordLoaderExamples,
    takeaway: WordLoaderTakeaway,
  };

  const { pairs } = useWordLoaderPairs(toRef(props, 'word'));

  const { activeStage, finishing, progress, pair, isSlow, stateOf } = useWordLoader({
    ready: toRef(props, 'ready'),
    pairs,
    onComplete: () => emit('complete'),
  });
</script>

<template>
  <div class="loader" role="status" :aria-label="COPY.ariaLabel(word)">
    <div class="glow" aria-hidden="true" />

    <div aria-hidden="true">
      <word-loader-header :word="word" :solid-tags="activeStage > 0" :finishing="finishing" />

      <word-loader-progress :progress="progress" :slow="isSlow" />

      <word-loader-section
        v-for="(s, i) in SECTIONS"
        :key="s.key"
        :label="s.label"
        :index="i"
        :state="stateOf(i)"
        :finishing="finishing"
      >
        <component :is="SHAPES[s.key]" />
      </word-loader-section>

      <word-loader-pair v-if="pair" :pair="pair" />
    </div>
  </div>
</template>

<style scoped>
.loader {
  position: relative;
  isolation: isolate;
  color: var(--text-primary);
  font-family: var(--ff-base);
}

.glow {
  position: absolute;
  top: -30px;
  left: -30px;
  z-index: -1;
  width: 320px;
  height: 200px;
  background: radial-gradient(closest-side, var(--primary), transparent);
  opacity: 0.12;
  filter: blur(24px);
  pointer-events: none;
  animation: breathe 4s ease-in-out infinite;
}
@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.1; }
  50% { transform: scale(1.15); opacity: 0.2; }
}

@media (prefers-reduced-motion: reduce) {
  .glow { animation: none; }
}
</style>
