<template>
  <a
    v-if="store.openTasksBar"
    @click="newBoardOpenModal"
    class="whitespace-nowrap flex items-center justify-center text-indigo-500 hover:text-indigo-400 cursor-pointer"
  >
    + Create new board
  </a>
  <div
    v-else
    @click="newBoardOpenModal"
    class="text-xl mx-auto flex items-center justify-center w-8 h-8 bg-indigo-500 text-neutral-200 rounded-md"
  >
    +
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
import { StatusModals } from "~/interfaces";
const store = useBoardStore();

const newBoardOpenModal = () => {
  store.openModalFn();
  store.modalStatus = StatusModals.BOARD;
};
</script>

<style scoped></style>
