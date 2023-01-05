<template>
  <main
    class="flex-1 flex relative items-start justify-start bg-slate-300 dark:bg-gray-900 z-20"
  >
    <CreateNewBoard
      class="absolute inset-4 text-2xl whitespace-nowrap rounded-xl bg-slate-200/40 dark:bg-gray-800/40"
      v-if="!boards.length"
    />
    <template v-else>
      <div
        class="flex flex-col gap-2 items-center justify-center absolute inset-4 text-2xl whitespace-nowrap rounded-xl bg-slate-200/40 dark:bg-gray-800/40"
        v-if="!currentBoard?.tasks?.length"
      >
        <p>The board has no tasks!</p>
        <AddTask class="ml-0" />
      </div>
      <div
        v-else
        class="h-full w-full flex gap-4 overflow-x-scroll p-4 scroll-pl-4 snap-mandatory snap-x md:px-6 md:gap-6 md:scroll-pl-6"
      >
        <section
          class="min-w-[75%] snap-start md:min-w-[60%] lg:min-w-[40%] xl:min-w-[30%] 2xl:min-w-[20%]"
        >
          <div class="whitespace-nowrap flex items-center gap-2 pb-4">
            <div class="w-4 h-4 rounded-full bg-indigo-500"></div>
            <h4>TODO (4)</h4>
          </div>
          <ul class="grid gap-2 md:gap-4">
            <li
              @click="CardOpenModal"
              class="bg-slate-200 dark:bg-gray-800 p-4 rounded-xl shadow-lg"
            >
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
        <section
          class="min-w-[75%] snap-start md:min-w-[60%] lg:min-w-[40%] xl:min-w-[30%] 2xl:min-w-[20%]"
        >
          <div class="whitespace-nowrap flex items-center gap-2 pb-4">
            <div
              class="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-amber-400"
            ></div>
            <h4>DOING (5)</h4>
          </div>
          <ul class="grid gap-2 md:gap-4">
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
        <section
          class="min-w-[75%] snap-start md:min-w-[60%] lg:min-w-[40%] xl:min-w-[30%] 2xl:min-w-[20%]"
        >
          <div class="whitespace-nowrap flex items-center gap-2 pb-4">
            <div class="w-4 h-4 rounded-full bg-amber-400"></div>
            <h4>DONE (2)</h4>
          </div>
          <ul class="grid gap-2 md:gap-4">
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
          <button
            @click="newColumnOpenModal"
            class="w-full h-full text-2xl whitespace-nowrap"
          >
            + Add new column
          </button>
        </div>
      </div>
    </template>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { StatusModals } from "~/interfaces";
import { useBoardStore } from "~/stores/board";
const store = useBoardStore();
const { boards, currentBoard } = storeToRefs(store);
const CardOpenModal = () => {
  store.openModal = true;
  store.modalStatus = StatusModals.CARD;
};

const newColumnOpenModal = () => {
  store.openModal = true;
  store.modalStatus = StatusModals.COLUMN;
};
</script>

<style scoped></style>
