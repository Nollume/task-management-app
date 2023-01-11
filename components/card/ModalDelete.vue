<template>
  <div
    v-if="store.deleteCardModal"
    class="fixed inset-0 grid place-items-center bg-black/40 z-[555]"
  >
    <div
      id="secondary-modal"
      class="w-4/5 pt-9 pb-4 px-4 rounded-xl relative grid place-items-center bg-slate-200 dark:bg-gray-800 sm:w-4/6 md:w-[30rem]"
    >
      <IconClose @click="closeModal" class="absolute top-2 right-4" />
      <div
        class="w-full flex items-center justify-center gap-4 p-2 bg-red-400 rounded-md"
      >
        <IconAlert />
        <div>
          <p>
            Are you sure you want to delete "<span class="uppercase">{{
              store.currentCard?.taskTitle
            }}</span
            >" task?
          </p>
        </div>
      </div>
      <div class="grid grid-cols-2 mt-4 gap-4 w-full">
        <button
          @click="closeModal"
          class="bg-indigo-500 py-2 rounded-md hover:bg-indigo-400"
        >
          Retain
        </button>
        <button
          @click="deleteTask"
          class="bg-red-400 py-2 rounded-md hover:bg-red-300"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
const store = useBoardStore();

const closeModal = () => {
  store.deleteCardModal = false;
  store.isDeleteCardModal = false;

  setTimeout(() => {
    store.isOpenModal = true;
  }, 100);
};

const deleteTask = () => {
  const currentTitle = store.currentCard?.taskTitle;
  store.currentBoard!.tasks = store.currentBoard!.tasks.filter(
    (task) => task.taskId !== store.currentCardId
  );
  store.currentCardId = null;

  store.saveToLocalStorage(store.boards);

  store.deleteCardModal = false;

  store.alert = false;
  store.showAlertMsg(`Task "${currentTitle}" deleted!`, "succeed");
};

const closeModalOnClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!store.isDeleteCardModal) return;
  if (!target.closest("#secondary-modal")) {
    closeModal();
  }
};
onMounted(() => {
  document.addEventListener("click", closeModalOnClick);
});
onUnmounted(() => {
  document.removeEventListener("click", closeModalOnClick);
});
</script>

<style scoped></style>
