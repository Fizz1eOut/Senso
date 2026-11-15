<script setup lang="ts">
  import { ref, computed } from 'vue';
  import AppInput from '~/components/inputs/AppInput.vue';
  import AppIcon from '~/components/base/AppIcon.vue';
  import WordSearchSuggestions from '~/components/content/word/word-search/WordSearchSuggestions.vue';

  interface WordSearchProps {
    loading?: boolean
    placeholder?: string
  }
  const props = withDefaults(defineProps<WordSearchProps>(), {
    loading: false,
    placeholder: 'Look up any English word',
  });

  const emit = defineEmits<{
    submit: [word: string]
  }>();

  const isOpen = ref(false);

  const model = defineModel<string>({ default: '' });

  const canSubmit = computed(() => !props.loading && model.value.trim().length > 0);

  function submitWord(word: string) {
    isOpen.value = false;
    emit('submit', word.trim());
  }

  function onSubmit() {
    if (!canSubmit.value) return;
    emit('submit', model.value.trim());
  }

  function onSelect(word: string) {
    model.value = word;
    submitWord(word);
  }
</script>

<template>
  <form
    class="word-search"
    @submit.prevent="onSubmit"
    @input="isOpen = true"
    @focusout="isOpen = false"
  >
    <app-input
      v-model="model"
      class="word-search__input"
      type="text"
      :placeholder="placeholder"
      :disabled="loading"
    >
      <template #icon-before>
        <app-icon 
          name="search" 
          size="var(--fs-md)" 
          color="var(--text-muted)" 
        />
      </template>
    </app-input>

    <word-search-suggestions
      v-if="isOpen"
      :query="model"
      @select="onSelect"
    />
  </form>
</template>

<style scoped>
</style>
