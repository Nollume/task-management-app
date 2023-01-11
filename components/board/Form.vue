<template>
  <form @submit.prevent="createBoard()" class="grid gap-4">
    <div class="flex flex-col gap-1">
      <div>
        <label class="cursor-pointer" for="board-title">Title</label>
      </div>
      <div class="relative">
        <input
          @input="animateCircle"
          class="input pr-10"
          type="text"
          id="board-title"
          placeholder="Board Title"
          v-model.trim="boardTitle"
          required
        />
        <IconAnimateCircle
          @animateCircle="animateCircle = $event"
          :titleLength="titleLength"
          class="absolute top-1/2 right-1.5 -translate-y-1/2"
        />
      </div>
    </div>
    <button
      class="text-neutral-200 bg-indigo-500 hover:bg-indigo-400 rounded-full w-full py-1"
    >
      Create Board
    </button>
  </form>
</template>

<script setup lang="ts">
import { board } from "@/interfaces";
import { useBoardStore } from "@/stores/board";
const store = useBoardStore();
const boardTitle = ref<string>("");

const getUniqueBoardId = () => {
  let id: number;
  if (!store.getStorageBoard()) id = 1;
  else id = Math.max(...store.getStorageBoard().map((b) => b.boardId)) + 1;
  return id;
};

const createBoard = () => {
  if (!boardTitle.value) return;
  if (boardTitle.value.length > store.maxTitleLength) {
    store.showAlertMsg("The title is too long!");
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
  const id = getUniqueBoardId();
  const board: board = {
    boardTitle: boardTitle.value,
    boardId: id,
    columns: [
      { statusTitle: "todo", badge: "bg-indigo-500" },
      {
        statusTitle: "doing",
        badge: "bg-gradient-to-r from-indigo-500 to-amber-400",
      },
      {
        statusTitle: "done",
        badge: "bg-amber-400",
      },
    ],
    tasks: [],
  };

  if (!store.getStorageBoard()) {
    store.boards.push(board);
  } else {
    store.boards = store.getStorageBoard();

    store.boards.push(board);
  }

  store.saveToLocalStorage(store.boards);

  store.setCurrentBoardId(id);

  store.alert = false;
  store.showAlertMsg(`Board "${boardTitle.value}" created!`, "succeed");
};
//**title length */
const titleLength = computed(() => boardTitle.value.length);

const animateCircle = ref<() => void>();
</script>

<style scoped></style>
