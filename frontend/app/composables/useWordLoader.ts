import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue';
import {
  COMPLETE_DELAY_MS,
  FINISH_STEP_MS,
  PAIRS,
  PAIR_MS,
  PROGRESS_CAP,
  PROGRESS_TAU_S,
  SECTIONS,
  SLOW_AFTER_MS,
  STAGE_MS,
  TICK_MS,
  type SectionState,
} from './word-loader.constants';

interface Options {
  ready: Readonly<Ref<boolean | undefined>>;
  onComplete: () => void;
}

export function useWordLoader({ ready, onComplete }: Options) {
  const elapsedMs = ref(0);
  const activeStage = ref(0);
  const finishing = ref(false);

  let tick: ReturnType<typeof setInterval> | undefined;
  let finish: ReturnType<typeof setInterval> | undefined;
  let doneTimeout: ReturnType<typeof setTimeout> | undefined;

  function startTicking() {

    const startedAt = Date.now();
    tick = setInterval(() => {
      elapsedMs.value = Date.now() - startedAt;
      activeStage.value = Math.min(Math.floor(elapsedMs.value / STAGE_MS), SECTIONS.length - 1);
    }, TICK_MS);
  }

  function finishFast() {
    if (finishing.value) return;
    clearInterval(tick);
    finishing.value = true;
    finish = setInterval(() => {
      if (activeStage.value < SECTIONS.length) {
        activeStage.value++;
        return;
      }
      clearInterval(finish);
      doneTimeout = setTimeout(onComplete, COMPLETE_DELAY_MS);
    }, FINISH_STEP_MS);
  }

  onMounted(() => {
    startTicking();
    if (ready.value) finishFast();
  });

  watch(ready, (value) => {
    if (value) finishFast();
  });

  onBeforeUnmount(() => {
    clearInterval(tick);
    clearInterval(finish);
    clearTimeout(doneTimeout);
  });

  const progress = computed(() =>
    finishing.value
      ? 100
      : PROGRESS_CAP * (1 - Math.exp(-elapsedMs.value / 1000 / PROGRESS_TAU_S)),
  );
  const pair = computed(() => PAIRS[Math.floor(elapsedMs.value / PAIR_MS) % PAIRS.length]);
  const isSlow = computed(() => !finishing.value && elapsedMs.value >= SLOW_AFTER_MS);

  function stateOf(index: number): SectionState {
    if (index < activeStage.value) return 'done';
    if (index === activeStage.value) return 'active';
    return 'pending';
  }

  return { activeStage, finishing, progress, pair, isSlow, stateOf };
}
