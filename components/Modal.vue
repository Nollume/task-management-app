<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        class="flex items-center justify-center fixed top-0 w-full min-h-full bg-black/40 z-50"
        v-if="openModal"
      >
        <div
          id="main-modal"
          class="w-[90%] max-w-xl p-4 rounded-xl bg-slate-200 dark:bg-gray-800 max-h-screen overflow-y-auto relative"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 v-if="!store.editableCard" class="text-lg capitalize">
              <slot name="title" />
            </h3>
            <div v-else class="w-full">
              <label for="cardTitleEditable">Title</label>
              <input
                type="text"
                id="cardTitleEditable"
                v-model="store.editedCardTitle"
                :placeholder="currentCard?.taskTitle"
                class="w-full capitalize px-4 py-2 mt-1 bg-slate-200 dark:bg-gray-800 text-gray-900/60 dark:text-neutral-200/60 border border-indigo-500 outline-none"
              />
            </div>

            <IconClose
              @click="closeModal"
              class="ml-3"
              :class="{ 'self-start': store.editableCard }"
            />
          </div>
          <slot name="description" />
          <slot name="form" />
          <CardModalDelete />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
import { storeToRefs } from "pinia";
const store = useBoardStore();
const { openModal, editableCard, currentCard, isOpenModal } =
  storeToRefs(store);

/**
 * close Modal
 * */

const closeModal = () => {
  openModal.value = false;
  isOpenModal.value = false;
  editableCard.value = false;
};

/**
 * close on ESC
 */

const closeModalOnEsc = (e: KeyboardEvent) => {
  if (e.code === "Escape" && openModal.value) {
    closeModal();
  }
};

/**
 * close on click
 */

const closeModalOnClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!isOpenModal.value) return;
  if (!target.closest("#main-modal")) {
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener("keyup", closeModalOnEsc);
  document.addEventListener("click", closeModalOnClick);
});
onUnmounted(() => {
  document.removeEventListener("keyup", closeModalOnEsc);
  document.removeEventListener("click", closeModalOnClick);
});
</script>

<style>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
