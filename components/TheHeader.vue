<template>
  <header
    class="h-14 w-full bg-slate-200 dark:bg-gray-800 flex items-center justify-start gap-2 px-4 z-40 lg:border-x-4 lg:border-slate-300 lg:dark:border-gray-900"
  >
    <div
      class="logo select-none font-bold text-2xl tracking-widest bg-gradient-to-r from-indigo-500 to-amber-400 bg-clip-text text-transparent"
    >
      ||||
    </div>

    <div
      id="headline-container"
      class="flex items-center gap-2 relative headline-container cursor-pointer"
      @click.prevent="toggleMenu"
    >
      <svg
        class="arrow fill-current w-5 h-5 transition-transform duration-300 ease-in-out"
        :class="!openTasksBar ? 'rotate-180' : ''"
        viewBox="0 0 20 20"
      >
        <path
          d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"
        ></path>
      </svg>
      <h2 v-if="!store.boards.length" class="capitalize text-lg">no boards</h2>
      <template v-if="currentBoardId">
        <h2
          class="capitalize text-lg sm:hidden"
          :title="currentBoard?.boardTitle"
        >
          {{ validateStr(currentBoard?.boardTitle!) }}
        </h2>
        <h2 class="capitalize text-lg hidden sm:block">
          {{ currentBoard?.boardTitle! }}
        </h2>
      </template>
    </div>
    <TaskAdd v-if="currentBoardId" />
  </header>
</template>

<script setup lang="ts">
import { validateStr } from "@/helpers/helper";
import { storeToRefs } from "pinia";
import { useBoardStore } from "~/stores/board";
const store = useBoardStore();
const { openTasksBar, currentBoardId, currentBoard, isAnimating } =
  storeToRefs(store);

let timer: ReturnType<typeof setTimeout>;
const toggleMenu = () => {
  clearTimeout(timer);
  isAnimating.value = true;
  openTasksBar.value = !openTasksBar.value;
  timer = setTimeout(() => {
    isAnimating.value = false;
  }, 300);
};
</script>

<style scoped></style>
