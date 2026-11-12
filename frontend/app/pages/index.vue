<script setup lang="ts">
  import { useTranslate } from '~/composables/useTranslate';
  import WordSearch from '~/components/content/word/word-search/WordSearch.vue';
  import WordLoader from '~/components/content/word/word-loader/WordLoader.vue';


  const {
    errorMessage,
    submittedWord,
    isLoading,
    showLoader,
    isReady,
    translate,
    onLoaderComplete,
  } = useTranslate();
</script>

<template>
  <main class="app">
    <word-search :loading="isLoading" @submit="translate" />
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <word-loader
      v-if="showLoader"
      :word="submittedWord"
      :ready="isReady"
      @complete="onLoaderComplete"
    />
  </main>
</template>
