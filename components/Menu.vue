<template>
  <div
    id="menu-container"
    class="flex flex-col gap-4 absolute top-16 left-2 right-2 bottom-2 p-4 rounded-lg rounded-tl-none duration-300 bg-slate-200 dark:bg-gray-800 z-30 overflow-y-auto overflow-x-hidden sm:max-w-[15rem] lg:static lg:flex lg:mt-14 lg:border-t-4 lg:border-slate-300 lg:dark:border-gray-900 lg:rounded-none"
    :class="openTasksBar ? 'lg:min-w-[15rem] ' : 'hidden  lg:min-w-[5rem]'"
  >
    <div
      class="hidden select-none items-center uppercase absolute top-3 left-8 text-2xl lg:flex"
    >
      <h1
        class="duration-300 inline-block"
        :class="openTasksBar ? 'rotate-0' : '-rotate-90'"
      >
        m
      </h1>
      <span
        class="duration-300 overflow-hidden text-2xl inline-block whitespace-nowrap"
        :class="!openTasksBar ? 'w-0' : 'w-[12ch]'"
        >anagement</span
      >
    </div>
    <div
      v-if="boards.length"
      class="flex gap-2 items-center justify-end pb-4 border-b border-gray-900/10 dark:border-neutral-200/10"
      :class="{ 'lg:flex-col': !store.openTasksBar }"
    >
      <div
        class="mr-auto p-1.5 cursor-pointer lg:hidden"
        @click="openTasksBar = false"
      >
        <IconClose />
      </div>
      <h2
        class="hidden lg:flex gap-2 lg:items-center mr-auto capitalize text-lg text-indigo-500"
        v-show="openTasksBar"
      >
        <IconBoard />
        {{ validateStr(currentBoard?.boardTitle!, 6) }}
      </h2>
      <div
        @click="editBoardOpenModal"
        class="bg-indigo-500 hover:bg-indigo-400 p-1.5 rounded-md cursor-pointer"
      >
        <IconEdit />
      </div>
      <div
        @click="removeBoardOpenModal"
        class="bg-red-400 hover:bg-red-300 p-1.5 rounded-md cursor-pointer"
      >
        <IconRemove />
      </div>
    </div>

    <BoardCreate :class="{ 'vertical-text rotate-180': !openTasksBar }" />
    <p v-show="openTasksBar" class="uppercase text-xs text-center">
      <span v-if="!boards.length">No boards</span>
      <span v-else-if="boards.length === 1">Board ({{ boards.length }})</span>
      <span v-else-if="boards.length > 1"
        >All boards ({{ boards.length }})</span
      >
    </p>
    <ul
      v-show="openTasksBar"
      class="flex flex-col gap-2 divide-y divide-gray-900/10 dark:divide-neutral-200/10"
    >
      <li
        v-for="board in boards"
        :key="board.boardId"
        @click="toggleBoards(board.boardId)"
        class="flex gap-2 cursor-pointer hover:text-indigo-400 capitalize pt-1.5"
        :class="{ 'text-indigo-500': currentBoardId === board.boardId }"
      >
        <IconBoard />
        <p :title="board.boardTitle">
          {{ validateStr(board.boardTitle, 12) }}
        </p>
      </li>
    </ul>

    <setColorTheme
      class="sm:w-52 sm:self-center lg:w-auto"
      :class="{
        'lg:vertical-text lg:rotate-180 lg:py-4 lg:px-2': !openTasksBar,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { validateStr } from "@/helpers/helper";
import { StatusModals } from "~/interfaces";
import { storeToRefs } from "pinia";
import { useBoardStore } from "~/stores/board";
const store = useBoardStore();
const { openTasksBar, openModal, boards, currentBoardId, currentBoard } =
  storeToRefs(store);

const removeBoardOpenModal = () => {
  store.openModal = true;
  store.modalStatus = StatusModals.REMOVEBOARD;
};

const editBoardOpenModal = () => {
  store.openModal = true;
  store.modalStatus = StatusModals.EDITBOARD;
};

const toggleBoards = (id: number) => {
  store.setCurrentBoardId(id);
  if (window.matchMedia("(max-width: 63.9375rem)").matches) {
    openTasksBar.value = false;
  }
};

const closeTaskBar = (e: MouseEvent) => {
  if (window.matchMedia("(max-width: 63.9375rem)").matches) {
    if (openTasksBar.value) {
      if (openModal.value) return;
      const target = e.target as HTMLElement;
      if (target.closest("#headline-container")) return;
      if (!target.closest("#menu-container")) {
        openTasksBar.value = false;
      }
    }
  }
};
onMounted(() => {
  document.addEventListener("click", closeTaskBar);
});
onUnmounted(() => {
  document.removeEventListener("click", closeTaskBar);
});
</script>
