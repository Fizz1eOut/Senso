import { ref, onBeforeUnmount } from 'vue';
import { translateWord } from '~/api/translate';
import { getTranslateErrorMessage } from '~/utils/translate-error';
import type { DictionaryEntry } from '~/types/word.types';

const LOADER_DELAY_MS = 250;

export function useTranslate() {
  const entry = ref<DictionaryEntry | null>(null);
  const errorMessage = ref('');
  const submittedWord = ref('');
  const isLoading = ref(false);
  const showLoader = ref(false);
  const isReady = ref(false);

  let pending: DictionaryEntry | null = null;
  let loaderTimer: ReturnType<typeof setTimeout> | undefined;

  function resetLoader() {
    clearTimeout(loaderTimer);
    showLoader.value = false;
    isReady.value = false;
  }

  async function translate(word: string) {
    if (isLoading.value) return;

    isLoading.value = true;
    errorMessage.value = '';
    entry.value = null;
    pending = null;
    submittedWord.value = word;
    resetLoader();

    loaderTimer = setTimeout(() => (showLoader.value = true), LOADER_DELAY_MS);

    const { data, error } = await translateWord(word);

    clearTimeout(loaderTimer);

    if (error || !data) {
      resetLoader();
      isLoading.value = false;
      errorMessage.value = getTranslateErrorMessage(error);
      return;
    }

    if (showLoader.value) {
      pending = data;
      isReady.value = true;
    } else {
      entry.value = data;
      isLoading.value = false;
    }
  }

  function onLoaderComplete() {
    entry.value = pending;
    pending = null;
    resetLoader();
    isLoading.value = false;
  }

  onBeforeUnmount(() => clearTimeout(loaderTimer));

  return {
    entry,
    errorMessage,
    submittedWord,
    isLoading,
    showLoader,
    isReady,
    translate,
    onLoaderComplete,
  };
}
