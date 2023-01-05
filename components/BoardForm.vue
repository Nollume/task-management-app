<template>
  <form @submit.prevent="store.createBoard(boardTitle)" class="grid gap-4">
    <div class="flex flex-col gap-1">
      <div>
        <label class="cursor-pointer" for="board-title">Title</label>
      </div>
      <input
        class="input"
        type="text"
        id="board-title"
        placeholder="Board Title"
        v-model.trim="boardTitle"
      />
    </div>
    <button
      class="text-neutral-200 bg-indigo-500 hover:bg-indigo-400 rounded-full w-full py-1"
    >
      Create Board
    </button>
  </form>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
const store = useBoardStore();
const boardTitle = ref<string>("");
</script>

<style scoped></style>
