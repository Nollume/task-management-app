<template>
  <div>
    <div
      class="flex items-center justify-center gap-4 p-2 bg-red-400 rounded-md"
    >
      <IconAlert />
      <div>
        <p>
          Are you sure you want to delete "<span class="uppercase">{{
            store.currentBoard?.boardTitle
          }}</span
          >" board?
        </p>
        <p v-if="taskLength! >= 1">You will lose all tasks in the board!</p>
      </div>
    </div>
    <div class="grid grid-cols-2 mt-4 gap-4">
      <button
        @click="store.closeModal"
        class="bg-indigo-500 py-2 rounded-md hover:bg-indigo-400"
      >
        Retain
      </button>
      <button
        @click.prevent="deleteBoard"
        class="bg-red-400 py-2 rounded-md hover:bg-red-300"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from "~/stores/board";
const store = useBoardStore();

const taskLength = computed(() => {
  return store.currentBoard?.tasks.length;
});

const deleteBoard = () => {
  const boardTitle = store.currentBoard?.boardTitle;
  store.boards.splice(store.currentBoardIndex, 1);

  if (store.boards.length) {
    store.setCurrentBoardId(store.boards[0].boardId);
    store.saveToLocalStorage(store.boards);
  } else {
    store.currentBoardId = null;

    localStorage.removeItem("currentBoardId");
    localStorage.removeItem("boards");
  }
  store.closeModal();

  store.alert = false;
  store.showAlertMsg(`Board "${boardTitle}" deleted!`, "succeed");
};
</script>

<style scoped></style>
