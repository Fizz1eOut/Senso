<script setup lang="ts">
  import AppContainer from '@/components/base/AppContainer.vue';
  import AppUnderlay from '@/components/base/AppUnderlay.vue';
  import AppSubtitle from '~/components/base/AppSubtitle.vue';
  import AppIcon from '~/components/base/AppIcon.vue';

  interface ModalProps {
    modelValue?: boolean;
    scrollable?: boolean;
    contentClass?: string;
  }
  withDefaults(defineProps<ModalProps>(), {
    modelValue: false
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'close'): void
  }>();

  const close = () => {
    emit('update:modelValue', false);
    emit('close');
  };
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div v-if="modelValue" class="modal" data-modal>
        <div class="overlay" @click.self="close">
          <div class="modal-content">
            <app-underlay>
              <app-container size="xl" class="modal-container">
                <div
                  class="modal-content__body modal-scroll"
                  :class="['content', contentClass, { scrollable }]"
                >
                  <div class="modal-content__header">
                    <div class="modal-content__group">
                      <app-subtitle>
                        <slot name="title" />
                      </app-subtitle>

                      <div class="modal-content__description">
                        <slot name="description" />
                      </div>
                    </div>

                    <app-icon 
                      name="cross"
                      size="var(--space-md)" 
                      color="var(--text-secondary)"
                      class="modal-content__icon"
                      @click="close"
                    />
                  </div>

                  <div class="modal-content__content">
                    <slot />
                  </div>
                </div>
              </app-container>
            </app-underlay>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
  .overlay {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 11;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
  }
  .content {
    max-width: 700px;
    width: 100%;
  }
  .content.scrollable {
    max-height: calc(100vh - 80px);
    overflow-y: auto;
  }
  .modal-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.25) transparent;
  }
  :deep(.modal-scroll::-webkit-scrollbar) {
    width: 6px;
  }
  :deep(.modal-scroll::-webkit-scrollbar-track) {
    background: transparent;
  }
  :deep(.modal-scroll::-webkit-scrollbar-thumb) {
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: var(--radius-sm);
    transition: background-color 0.2s ease-in-out;
  }
  :deep(.modal-scroll::-webkit-scrollbar-thumb:hover) {
    background-color: rgba(0, 0, 0, 0.45);
  }

  .modal-content__content{
    margin-top: var( --space-md);
  }
  .modal-content__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
  }
  .modal-content__description {
    font-size: var(--fs-sm);
    color: var(--text-secondary);
    margin-top: var(--space-xs);
  }
  .modal-content__icon {
    cursor: pointer;
  }

  @media (max-width: 499px) {
    .modal-container {
      padding: 10px;
    }
    .content__body {
      padding-top: var(--space-sm);
    }
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease-in-out;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
