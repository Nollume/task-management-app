<template>
  <div>
    <div
      v-if="someTasks"
      class="flex items-center justify-center gap-4 p-2 bg-red-400 rounded-md"
    >
      <IconAlert />
      <p>
        You will lose all tasks in "<span class="uppercase">{{
          store.columnToDelete.statusTitle
        }}</span
        >" column!
      </p>
    </div>
    <div v-else>
      <p>
        Are you sure you want to delete "<span class="uppercase">{{
          store.columnToDelete.statusTitle
        }}</span
        >" column?
      </p>
    </div>
    <div class="grid grid-cols-2 mt-4 gap-4">
      <button
        @click="store.openModal = false"
        class="bg-indigo-500 py-2 rounded-md hover:bg-indigo-400"
      >
        Retain
      </button>
      <button
        @click="removeColumn(store.columnToDelete.index)"
        class="bg-red-400 py-2 rounded-md hover:bg-red-300"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
const store = useBoardStore();

const someTasks = computed(() => {
  return store.currentBoard?.tasks.some(
    (t) => t.status === store.columnToDelete.statusTitle
  );
});

const removeColumn = (index: number) => {
  store.currentBoard?.columns.splice(index, 1);

  store.saveToLocalStorage(store.boards);
  store.openModal = false;
};
</script>

<style scoped></style>
