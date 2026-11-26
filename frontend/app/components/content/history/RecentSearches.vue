<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useWordsStore } from '~/stores/wordsStore';
  import WordMiniCard from '~/components/content/word/WordMiniCard.vue';
  import AppLink from '~/components/base/AppLink.vue';

  const emit = defineEmits<{ 
    (e: 'select', word: string): void 
  }>();

  const store = useWordsStore();

  onMounted(store.load);
</script>

<template>
  <div v-if="store.records.length" class="recent">
    <div class="recent__header">
      <h3 class="recent__title">Recent searches</h3>
      <NuxtLink to="/history">
        <app-link>See all</app-link>
      </NuxtLink>
    </div>
    <div class="recent__body">
      <word-mini-card
        v-for="record in store.records"
        :key="record.word"
        :record="record"
        @select="emit('select', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
  .recent__body {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr));
    gap: var(--gap-sm);
  }
  .recent__header {
    margin-bottom: var(--space-xs);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .recent__title {
    font-size: var(--fs-md);
    color: var(--text-secondary);
    font-weight: var(--fw-medium);
  }
  @media (max-width: 991px) {
  
  }
</style>
