<template>
  <a
    @click="newBoardOpenModal"
    class="whitespace-nowrap flex items-center justify-center text-indigo-500 hover:text-indigo-400 cursor-pointer"
  >
    + Create new board
  </a>
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
