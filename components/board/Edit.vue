<template>
  <form @submit.prevent="editBoardTitle">
    <div class="flex flex-col gap-1 mb-4">
      <div>
        <label class="cursor-pointer" for="board-title">Title</label>
      </div>
      <input
        ref="titleInput"
        class="input"
        type="text"
        id="board-title"
        placeholder="Board Title"
        v-model="boardTitle"
      />
    </div>
    <button
      class="text-neutral-200 bg-indigo-500 hover:bg-indigo-400 rounded-full w-full py-1"
    >
      Edit Board Title
    </button>
  </form>
</template>

<script setup lang="ts">
import { useBoardStore } from "~/stores/board";
const store = useBoardStore();
const boardTitle = ref<string>(store.currentBoard?.boardTitle!);

const editBoardTitle = () => {
  store.alert = false;
  if (boardTitle.value === store.currentBoard?.boardTitle!) {
    store.showAlertMsg("You used the same board name!");
    return;
  }
  store.alert = false;
  if (
    store.boards.some(
      (item) => item.boardTitle.toLowerCase() === boardTitle.value.toLowerCase()
    )
  ) {
    store.showAlertMsg("Board with this name already exists!");
    return;
  }

  store.currentBoard!.boardTitle = boardTitle.value;

  store.saveToLocalStorage(store.boards);
};

const titleInput = ref<HTMLInputElement>(null!);

onMounted(() => {
  titleInput.value.focus();
  titleInput.value.select();
});
</script>

<style scoped></style>
