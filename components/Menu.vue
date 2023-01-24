<template>
  <div
    id="menu-container"
    class="flex flex-col gap-4 absolute top-16 left-2 right-2 bottom-2 p-4 rounded-lg rounded-tl-none duration-300 ease-in bg-slate-200 dark:bg-gray-800 z-30 overflow-y-auto overflow-x-hidden sm:max-w-[15rem] lg:static lg:flex lg:mt-14 lg:border-t-4 lg:border-slate-300 lg:dark:border-gray-900 lg:rounded-none"
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
      class="flex gap-2 items-center justify-end pb-4 border-gray-900/10 dark:border-neutral-200/10"
      :class="{ 'lg:flex-col': !store.openTasksBar, 'border-b': !isAnimating }"
    >
      <div
        class="mr-auto p-1.5 cursor-pointer lg:hidden"
        @click="openTasksBar = false"
      >
        <IconClose />
      </div>
      <Transition name="fadeIn" appear>
        <div
          v-if="!isAnimating"
          @click="editBoardOpenModal"
          class="bg-indigo-500 hover:bg-indigo-400 p-1.5 rounded-md cursor-pointer"
        >
          <IconEdit />
        </div>
      </Transition>
      <Transition name="fadeIn" appear>
        <div
          v-if="!isAnimating"
          @click="removeBoardOpenModal"
          class="bg-red-400 hover:bg-red-300 p-1.5 rounded-md cursor-pointer"
        >
          <IconRemove />
        </div>
      </Transition>
    </div>
    <div
      v-else
      class="mr-auto p-1.5 cursor-pointer lg:hidden"
      @click="openTasksBar = false"
    >
      <IconClose />
    </div>
    <Transition name="fadeIn">
      <BoardCreate v-if="!isAnimating" />
    </Transition>
    <Transition name="fadeIn">
      <p
        v-show="openTasksBar && !isAnimating"
        class="uppercase text-xs text-center"
      >
        <span v-if="!boards.length">No boards</span>
        <span v-else-if="boards.length === 1">Board ({{ boards.length }})</span>
        <span v-else-if="boards.length > 1"
          >All boards ({{ boards.length }})</span
        >
      </p>
    </Transition>
    <Transition name="fadeIn">
      <ul
        v-show="openTasksBar && !isAnimating"
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
          <p class="truncate" :title="board.boardTitle">
            {{ board.boardTitle }}
          </p>
        </li>
      </ul>
    </Transition>
    <Transition name="fadeIn">
      <setColorTheme
        v-show="!isAnimating"
        class="sm:w-52 sm:self-center lg:w-auto"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { StatusModals } from "~/interfaces";
import { storeToRefs } from "pinia";
import { useBoardStore } from "~/stores/board";
const store = useBoardStore();
const { openTasksBar, openModal, boards, currentBoardId, isAnimating } =
  storeToRefs(store);

const removeBoardOpenModal = () => {
  store.openModalFn();
  store.modalStatus = StatusModals.REMOVEBOARD;
};

const editBoardOpenModal = () => {
  store.openModalFn();
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

<style scoped>
.fadeIn-enter-active {
  transition: all 0.25s ease-in;
}


.fadeIn-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
</style>
