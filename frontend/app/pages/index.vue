<script setup lang="ts">
  import { useTranslate } from '~/composables/useTranslate';
  import WordSearch from '~/components/content/word/word-search/WordSearch.vue';
  import WordDetails from '~/components/content/word/word-details/WordDetails.vue';
  import WordLoader from '~/components/content/word/word-loader/WordLoader.vue';
  import WordEmptyState from '~/components/content/word/WordEmptyState.vue';
  import AppContainer from '~/components/base/AppContainer.vue';
  import AppDivider from '~/components/base/AppDivider.vue';
  import RecentSearches from '~/components/content/history/RecentSearches.vue';
  
  const {
    entry,
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
  <div class="search-page">
    <div class="search-panel">
      <app-container>
        <div class="search-panel__search">
          <word-search :loading="isLoading" @submit="translate" />
          <div>
            <p v-if="errorMessage" class="search-panel__error">{{ errorMessage }}</p>
          </div>
        </div>

        <app-divider />

        <recent-searches @select="translate" />
      </app-container>
    </div>

    <div class="search-stage">
      <word-loader
        v-if="showLoader"
        :word="submittedWord"
        :ready="isReady"
        @complete="onLoaderComplete"
      />
      <word-details v-else-if="entry" :entry="entry" />
      <word-empty-state v-else @pick="translate" />
    </div>
  </div>
</template>

<style scoped>
  .search-page {
    display: flex;
    align-items: flex-start;
  }
  .search-panel {
    flex: 0 0 350px;
    height: 100dvh;
    border-right: 1px solid var(--border);
  }
  .search-stage {
    flex: 1 1 0;
    min-width: 0;
  }

  @media (max-width: 1024px) {
    .search-panel {
      flex-basis: 300px;
    }
  }
  @media (max-width: 991px) {
    .search-page {
      flex-direction: column;
      align-items: stretch;
      gap: 20px;
    }
    .search-panel {
      flex: none;
      height: auto;
      border-right: 0;
      border-bottom: 1px solid var(--border);
    }
  }
</style>
