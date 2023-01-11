<template>
  <div
    class="min-w-full max-h-screen grid place-items-center bg-slate-200/40 dark:bg-gray-800/40 rounded-xl snap-start"
  >
    <button
      @click="newColumnOpenModal"
      class="w-full h-full text-2xl whitespace-nowrap"
    >
      + Add new column
    </button>
  </div>
</template>

<script setup lang="ts">
import { StatusModals } from "~/interfaces";
import { useBoardStore } from "~/stores/board";
const store = useBoardStore();
const newColumnOpenModal = () => {
  store.openModalFn();
  store.modalStatus = StatusModals.COLUMN;
};
</script>

<style scoped></style>
