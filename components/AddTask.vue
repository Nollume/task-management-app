<template>
  <button
    @click="openModal = true"
    class="text-xs text-neutral-200 whitespace-nowrap ml-auto px-2 py-1 bg-indigo-500 rounded-full hover:bg-indigo-400 duration-300 ease-in-out"
  >
    + Add task
  </button>
  <Modal>
    <template #title>Add New Task</template>
    <template #form>
      <form class="grid gap-4">
        <div class="flex flex-col gap-1">
          <div><label class="cursor-pointer" for="title">Title</label></div>
          <input
            class="input"
            type="text"
            id="title"
            placeholder="Task Title"
          />
        </div>
        <div class="flex flex-col gap-1">
          <div><label for="description">Description</label></div>
          <textarea
            class="input resize-none"
            name="description"
            id="description"
            placeholder="Task Description"
          ></textarea>
        </div>
        <div class="flex flex-col gap-1">
          <div><label for="subtask">Subtasks</label></div>
          <input
            class="input"
            type="text"
            id="subtask"
            placeholder="Add subtask"
          />

          <ul class="grid gap-2 mt-1">
            <li class="flex items-center gap-2">
              <p
                class="flex-1 border px-2 py-1 border-gray-900/10 dark:border-neutral-200/10 bg-gradient-to-r from-indigo-500 to-amber-400 bg-clip-text text-transparent"
              >
                asdfasdfasdf
              </p>
              <IconClose />
            </li>
            <li class="flex items-center gap-2">
              <p
                class="flex-1 border px-2 py-1 border-gray-900/10 dark:border-neutral-200/10 bg-gradient-to-r from-indigo-500 to-amber-400 bg-clip-text text-transparent"
              >
                hey adf
              </p>
              <IconClose />
            </li>
          </ul>
          <a
            class="text-indigo-500 w-full text-center hover:text-indigo-400 py-2"
          >
            + Add New Subtask
          </a>
        </div>
        <div class="flex flex-col gap-1">
          <div><label for="status">Status</label></div>
          <div class="relative">
            <svg
              class="absolute -rotate-90 arrow fill-current w-5 h-5 transition-transform duration-300 ease-in-out cursor-pointer right-2 top-1/2 -translate-y-1/2 z-10"
              viewBox="0 0 20 20"
            >
              <path
                d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"
              ></path>
            </svg>
            <select
              class="px-2 relative py-1 w-full appearance-none bg-transparent outline-none border border-gray-900/10 dark:border-neutral-200/10 z-20"
              name="status"
              id="status"
            >
              <option class="bg-slate-200 dark:bg-gray-800" value="todo">
                Todo
              </option>
              <option class="bg-slate-200 dark:bg-gray-800" value="doing">
                Doing
              </option>
              <option class="bg-slate-200 dark:bg-gray-800" value="done">
                Done
              </option>
            </select>
          </div>
        </div>
        <button
          class="text-neutral-200 bg-indigo-500 hover:bg-indigo-400 rounded-full py-1"
        >
          Create Task
        </button>
      </form>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
import { storeToRefs } from "pinia";
const { openModal } = storeToRefs(useBoardStore());
</script>

<style scoped></style>
