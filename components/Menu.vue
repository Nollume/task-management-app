<template>
  <div
    class="flex flex-col gap-4 absolute top-16 left-2 right-2 bottom-2 p-4 rounded-lg rounded-tl-none duration-300 bg-slate-200 dark:bg-gray-800 z-30 overflow-y-auto overflow-x-hidden sm:max-w-[15rem] lg:static lg:mt-14 lg:border-t-4 lg:border-slate-300 lg:dark:border-gray-900 lg:rounded-none"
    :class="openTasksBar ? 'lg:w-60 lg:flex' : 'hidden lg:flex lg:w-20'"
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
      <div class="mr-auto p-1.5 cursor-pointer">
        <IconClose class="lg:hidden" @click="openTasksBar = false" />
      </div>
      <div
        class="bg-indigo-500 hover:bg-indigo-400 p-1.5 rounded-md cursor-pointer"
      >
        <svg class="w-4 h-4 fill-slate-200" viewBox="0 0 20 20">
          <path
            d="M19.404,6.65l-5.998-5.996c-0.292-0.292-0.765-0.292-1.056,0l-2.22,2.22l-8.311,8.313l-0.003,0.001v0.003l-0.161,0.161c-0.114,0.112-0.187,0.258-0.21,0.417l-1.059,7.051c-0.035,0.233,0.044,0.47,0.21,0.639c0.143,0.14,0.333,0.219,0.528,0.219c0.038,0,0.073-0.003,0.111-0.009l7.054-1.055c0.158-0.025,0.306-0.098,0.417-0.211l8.478-8.476l2.22-2.22C19.695,7.414,19.695,6.941,19.404,6.65z M8.341,16.656l-0.989-0.99l7.258-7.258l0.989,0.99L8.341,16.656z M2.332,15.919l0.411-2.748l4.143,4.143l-2.748,0.41L2.332,15.919z M13.554,7.351L6.296,14.61l-0.849-0.848l7.259-7.258l0.423,0.424L13.554,7.351zM10.658,4.457l0.992,0.99l-7.259,7.258L3.4,11.715L10.658,4.457z M16.656,8.342l-1.517-1.517V6.823h-0.003l-0.951-0.951l-2.471-2.471l1.164-1.164l4.942,4.94L16.656,8.342z"
          ></path>
        </svg>
      </div>
      <div class="bg-red-400 hover:bg-red-300 p-1.5 rounded-md cursor-pointer">
        <svg class="w-4 h-4 fill-slate-200" viewBox="0 0 20 20">
          <path
            d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"
          ></path>
        </svg>
      </div>
    </div>

    <CreateNewBoard :class="{ 'vertical-text rotate-180': !openTasksBar }" />
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
        @click="store.setCurrentBoardId(board.boardId)"
        class="cursor-pointer hover:text-indigo-400 capitalize pt-1.5"
        :class="{ 'text-indigo-500': currentBoardId === board.boardId }"
      >
        <p :title="board.boardTitle">
          {{ store.validateStr(board.boardTitle, 15) }}
        </p>
      </li>
    </ul>

    <setColorTheme
      class=" sm:w-52 sm:self-center lg:w-auto lg:mt-auto"
      :class="{
        'lg:vertical-text lg:rotate-180 lg:py-4 lg:px-2': !openTasksBar,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBoardStore } from "~/stores/board";
const store = useBoardStore();
const { openTasksBar, boards, currentBoardId } = storeToRefs(store);
</script>
