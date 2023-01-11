<template>
  <form @submit.prevent="editBoardTitle">
    <div class="flex flex-col gap-1 mb-4">
      <div>
        <label class="cursor-pointer" for="board-title">Title</label>
      </div>
      <div class="relative">
        <input
          @input="animateCircle"
          ref="titleInput"
          class="input pr-10"
          type="text"
          id="board-title"
          placeholder="Board Title"
          v-model="boardTitle"
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
      Edit Board Title
    </button>
  </form>
</template>

<script setup lang="ts">
import { useBoardStore } from "~/stores/board";
const store = useBoardStore();
const boardTitle = ref<string>(store.currentBoard?.boardTitle!);

const editBoardTitle = () => {
  if (!boardTitle.value) return;
  store.alert = false;
  if (boardTitle.value === store.currentBoard?.boardTitle!) {
    store.showAlertMsg(`You used the same board name "${boardTitle.value}"!`);
    return;
  }

  if (titleLength.value > store.maxTitleLength) {
    store.showAlertMsg("The title is too long!");
    return;
  }

  if (
    store.boards.some(
      (item) => item.boardTitle.toLowerCase() === boardTitle.value.toLowerCase()
    )
  ) {
    store.showAlertMsg(`Board with name "${boardTitle.value}" already exists!`);
    return;
  }
  const oldTiltle = store.currentBoard?.boardTitle;

  store.currentBoard!.boardTitle = boardTitle.value;

  store.saveToLocalStorage(store.boards);

  store.showAlertMsg(
    `Board "${oldTiltle}" has been renamed to "${boardTitle.value}".`,
    "succeed"
  );
};
const titleLength = computed(() => boardTitle.value.length);

const animateCircle = ref<() => void>();

const titleInput = ref<HTMLInputElement>(null!);

onMounted(() => {
  titleInput.value.focus();
  titleInput.value.select();
});
</script>

<style scoped></style>
