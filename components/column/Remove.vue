<template>
  <div>
    <div
      class="flex items-center justify-center gap-4 p-2 bg-red-400 rounded-md"
    >
      <IconAlert />
      <div>
        <p>
          Are you sure you want to delete "<span class="uppercase">{{
            store.columnToDelete.statusTitle
          }}</span
          >" column?
        </p>
        <p v-if="someTasks">You will lose all tasks in the column!</p>
      </div>
    </div>

    <div class="grid grid-cols-2 mt-4 gap-4">
      <button
        @click="store.openModal = false"
        class="bg-indigo-500 py-2 rounded-md hover:bg-indigo-400"
      >
        Retain
      </button>
      <button
        @click.prevent="
          removeColumn(
            store.columnToDelete.index,
            store.columnToDelete.statusTitle
          )
        "
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

const removeColumn = (index: number, title: string) => {
  /**remove column by index */
  const columns = store.currentBoard?.columns!;
  columns.splice(index, 1);

  //**If the column has tasks remove them. */
  if (someTasks.value) {
    let tasks = store.currentBoard?.tasks!;

    tasks = tasks.filter((t) => t.status !== title);

    store.currentBoard?.tasks.splice(0, store.currentBoard?.tasks.length);
    tasks.forEach((task) => store.currentBoard?.tasks.push(task));
  }
  //**Save to localStorage */
  store.saveToLocalStorage(store.boards);
  store.openModal = false;
};
</script>

<style scoped></style>
