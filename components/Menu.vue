<template>
  <div
    class="flex flex-col gap-4 absolute top-16 left-2 right-2 p-4 rounded-lg rounded-tl-none duration-300 bg-slate-200 dark:bg-gray-800 z-30 shadow-lg overflow-y-auto overflow-x-hidden sm:max-w-lg lg:static lg:mt-14 lg:mb-14 lg:border-y-4 lg:border-l-4 lg:border-slate-300 lg:dark:border-gray-900 lg:rounded-none lg:shadow-none "
  >
    <EditDeleteIcons
      class="relative after:absolute after:-bottom-3 after:w-full after:h-px after:bg-gray-900/10 after:dark:bg-neutral-200/10"
      ><div class="mr-auto p-1.5 cursor-pointer">
        <IconClose class="lg:hidden" @click="openTasksBar = false" /></div
    ></EditDeleteIcons>
    <CreateNewBoard class="py-2" />
    <p class="uppercase text-xs text-center">
      All boards ({{ boards.length }})
    </p>
    <ul
      class="flex flex-col gap-2 divide-y divide-gray-900/10 dark:divide-neutral-200/10"
    >
      <li class="cursor-pointer hover:text-indigo-400 capitalize pt-1.5">
        <p>Build UI</p>
      </li>
      <li class="cursor-pointer hover:text-indigo-400 capitalize pt-1.5">
        unit testing
      </li>
      <li class="cursor-pointer hover:text-indigo-400 capitalize pt-1.5">
        tvarohový koláč
      </li>
    </ul>
    <setColorTheme class="sm:w-52 sm:self-center lg:mt-auto" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBoardStore } from "~/stores/board";
const store = useBoardStore();
const { openTasksBar, boards } = storeToRefs(store);
</script>
