<script setup lang="ts">
  import { ref, computed, useSlots } from 'vue';

  interface SearchInputProps {
    modelValue: string | number;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    readonly?: boolean;
  }
  const props = defineProps<SearchInputProps>();

  const emit = defineEmits(['update:modelValue']);

  const slots = useSlots();

  const inputRef = ref<HTMLInputElement | null>(null);

  defineExpose({
    focus: () => inputRef.value?.focus()
  });

  const hasIconBefore = computed(() => !!slots['icon-before']?.());
  const hasIconAfter = computed(() => !!slots['icon-after']?.());
  const inputValue = computed({
    get: () => props.modelValue,
    set: (newValue: string | number) => emit('update:modelValue', newValue),
  });

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
  };
</script>

<template>
  <div 
    :class="{
      'has-icon-before': hasIconBefore,
      'has-icon-after': hasIconAfter,
    }"
    class="input-wrapper"
  >
    <div class="icon-before">
      <slot name="icon-before"/>
    </div>

    <input
      ref="inputRef"
      v-model="inputValue"
      :type="type || 'text'"
      class="input"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @input="handleInput"
    >

    <div class="icon-after">
      <slot name="icon-after"/>
    </div>
  </div>
</template>

<style scoped>
  .input-wrapper {
    position: relative;
    width: 100%;
  }
  .input {
    padding: 0 16px;
    width: 100%;
    height: var(--space-xl);
    font-size: var(--fs-sm);
    color: var(--text-primary);
    background-color: var(--bg-surface-2);
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    outline: none;
  }
  .input:focus {
    border-color: var(--border-focus);
    box-shadow: var(--shadow-glow-brand);
  }
  .icon-before {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
  }
  .has-icon-before .input {
    padding: 0 16px 0 30px;
  }
  .has-icon-after .input {
    padding: 0 30px 0 16px;
  }
  .icon-after {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
  }

  ::-webkit-input-placeholder {
    color: var(--text-muted);
  }
  :-moz-placeholder { 
    color: var(--text-muted);
  }
  ::-moz-placeholder { 
    color: var(--text-muted);
  }
  :-ms-input-placeholder {
    color: var(--text-muted);
  }
</style>
