<template>
  <button
    @click="newTaskOpenModal"
    class="text-xs text-neutral-200 whitespace-nowrap ml-auto px-2 py-1 bg-indigo-500 rounded-full hover:bg-indigo-400 duration-300 ease-in-out sm:text-sm md:text-base"
  >
    + Add task
  </button>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
import { StatusModals } from "~/interfaces";
const store = useBoardStore();

const newTaskOpenModal = () => {
  store.openModal = true;
  store.modalStatus = StatusModals.TASK;
};
</script>

<style scoped></style>
