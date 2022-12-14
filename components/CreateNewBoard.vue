<template>
  <button
    @click="newBoardOpenModal"
    class="whitespace-nowrap text-indigo-500 hover:text-indigo-400"
  >
    + Create new board
  </button>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
import { StatusModals } from "~/interfaces";
const store = useBoardStore();

const newBoardOpenModal = () => {
  store.openModal = true;
  store.modalStatus = StatusModals.BOARD;
};
</script>

<style scoped></style>
