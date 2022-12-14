<template>
  <button
    @click="openModal = true"
    class="whitespace-nowrap text-indigo-500 hover:text-indigo-400"
  >
    + Create new board
  </button>
  <Modal>
    <template #title>Add New Board</template>
    <template #form>
      <form><label for="title"></label> <input type="text" id="title" /></form>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
import { storeToRefs } from "pinia";
const { openModal } = storeToRefs(useBoardStore());
</script>

<style scoped></style>
