<script setup lang="ts">
  import { computed } from 'vue';
  import AppInput from '~/components/inputs/AppInput.vue';
  import AppIcon from '~/components/base/AppIcon.vue';

  interface Props {
    loading?: boolean
    placeholder?: string
  }

  interface Emits {
    submit: [word: string]
  }

  const props = withDefaults(defineProps<Props>(), {
    loading: false,
    placeholder: 'Look up any English word',
  });

  const emit = defineEmits<Emits>();

  const model = defineModel<string>({ default: '' });

  const canSubmit = computed(() => !props.loading && model.value.trim().length > 0);

  function onSubmit() {
    if (!canSubmit.value) return;
    emit('submit', model.value.trim());
  }
</script>

<template>
  <form class="word-search" @submit.prevent="onSubmit">
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
  </form>
</template>

<style scoped>
</style>
