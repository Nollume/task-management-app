<template>
  <header
    class="h-14 w-full bg-slate-200 dark:bg-gray-800 flex items-center justify-start gap-2 px-4"
  >
    <div
      class="logo select-none font-bold text-2xl tracking-widest bg-gradient-to-r from-indigo-500 to-amber-400 bg-clip-text text-transparent"
    >
      ||||
    </div>
    <div
    
      class="flex items-center gap-2 relative headline-container"
      @click.prevent="openTasksBar = !openTasksBar"
    >
      <h1 class="capitalize text-lg cursor-pointer">Platform launch</h1>
      <svg
        class="arrow fill-current w-5 h-5 transition-transform duration-300 ease-in-out cursor-pointer"
        :class="!openTasksBar ? '-rotate-90' : 'rotate-90'"
        viewBox="0 0 20 20"
      >
        <path
          d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"
        ></path>
      </svg>
      <div
        v-show="openTasksBar"
        class="flex flex-col gap-4 absolute top-12 left-0 p-4 rounded-lg rounded-tl-none bg-slate-200 dark:bg-gray-800 z-30 shadow-lg"
      >
        <CreateNewBoard />
        <p class="uppercase text-xs text-center">All boards ({{ boards.length }})</p>
        <ul
          class="flex flex-col gap-2 divide-y divide-gray-900/10 dark:divide-neutral-200/10"
        >
          <li class="cursor-pointer hover:text-indigo-400 capitalize pt-1.5">
            Build UI
          </li>
          <li class="cursor-pointer hover:text-indigo-400 capitalize pt-1.5">
            unit testing
          </li>
          <li class="cursor-pointer hover:text-indigo-400 capitalize pt-1.5">
            tvarohový koláč
          </li>
        </ul>
        <setColorTheme />
      </div>
    </div>
    <AddTask  />
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBoardStore } from "~/stores/board";
const store = useBoardStore();
const { boards } = storeToRefs(store);
const openTasksBar = ref(false);
</script>

<style scoped></style>
