<template>
  <main class="flex-1 flex items-start justify-start">
    <CreateNewBoard
      class="m-4 w-full h-full text-2xl whitespace-nowrap rounded-xl bg-slate-200/40 dark:bg-gray-800/40"
      v-if="boards.length"
    />
    <div
      v-else
      class="h-full flex gap-4 overflow-x-auto p-4 scroll-pl-4 snap-mandatory snap-x"
    >
      <section class="min-w-[75%] snap-start">
        <div class="whitespace-nowrap flex items-center gap-2 pb-4">
          <div class="w-4 h-4 rounded-full bg-indigo-500"></div>
          <h4>TODO (4)</h4>
        </div>
        <ul class="grid gap-2">
          <li class="bg-slate-200 dark:bg-gray-800 p-4 rounded-xl shadow-lg">
            <h5
              class="pb-2 border-b border-gray-900/10 dark:border-neutral-200/10"
            >
              BUILD UI for onboard flow
            </h5>
            <p class="text-sm pt-2 opacity-75">0 of 3 subtasks</p>
          </li>
          <li class="bg-slate-200 dark:bg-gray-800 p-4 rounded-xl shadow-lg">
            <h5
              class="pb-2 border-b border-gray-900/10 dark:border-neutral-200/10"
            >
              BUILD UI for onboard flow
            </h5>
            <p class="text-sm pt-2 opacity-75">0 of 3 subtasks</p>
          </li>
        </ul>
      </section>
      <section class="min-w-[75%] snap-start">
        <div class="whitespace-nowrap flex items-center gap-2 pb-4">
          <div
            class="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-amber-400"
          ></div>
          <h4>DOING (5)</h4>
        </div>
        <ul class="grid gap-2">
          <li class="bg-slate-200 dark:bg-gray-800 p-4 rounded-xl shadow-lg">
            <h5
              class="pb-2 border-b border-gray-900/10 dark:border-neutral-200/10"
            >
              BUILD UI for onboard flow
            </h5>
            <p class="text-sm pt-2 opacity-75">0 of 3 subtasks</p>
          </li>
        </ul>
      </section>
      <section class="min-w-[75%] snap-start">
        <div class="whitespace-nowrap flex items-center gap-2 pb-4">
          <div class="w-4 h-4 rounded-full bg-amber-400"></div>
          <h4>DONE (2)</h4>
        </div>
        <ul class="grid gap-2">
          <li class="bg-slate-200 dark:bg-gray-800 p-4 rounded-xl shadow-lg">
            <h5
              class="pb-2 border-b border-gray-900/10 dark:border-neutral-200/10"
            >
              BUILD UI for onboard flow
            </h5>
            <p class="text-sm pt-2 opacity-75">0 of 3 subtasks</p>
          </li>
          <li class="bg-slate-200 dark:bg-gray-800 p-4 rounded-xl shadow-lg">
            <h5
              class="pb-2 border-b border-gray-900/10 dark:border-neutral-200/10"
            >
              BUILD UI for onboard flow
            </h5>
            <p class="text-sm pt-2 opacity-75">0 of 3 subtasks</p>
          </li>
        </ul>
      </section>
      <div
        class="min-w-full max-h-screen grid place-items-center bg-slate-200/40 dark:bg-gray-800/40 rounded-xl snap-start"
      >
        <button class="w-full h-full text-2xl whitespace-nowrap">
          + Add new column
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBoardStore } from "~/stores/board";
const store = useBoardStore();
const { boards } = storeToRefs(store);
</script>

<style scoped></style>
