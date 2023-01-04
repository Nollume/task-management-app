<template>
  <div>
    <Modal>
      <template v-if="store.modalStatus === StatusModals.TASK" #title
        >Add New Task</template
      >
      <template v-else-if="store.modalStatus === StatusModals.BOARD" #title
        >Add New Board</template
      >
      <template v-else-if="store.modalStatus === StatusModals.CARD" #title
        >Card title</template
      >
      <template v-else-if="store.modalStatus === StatusModals.COLUMN" #title
        >Add New Column</template
      >
      <template v-if="store.modalStatus === StatusModals.CARD" #description>
        <div>
          <EditDeleteIcons />
          <p
            class="p-4 mt-4 text-gray-900/60 dark:text-neutral-200/60 border border-gray-900/10 dark:border-neutral-200/10"
          >
            Some description about cards. some description about cardssome
            description about cardssome description about cardssome description
            about cardssome description about cardssome description about cards
          </p>
        </div>
      </template>

      <template v-if="store.modalStatus === StatusModals.TASK" #form>
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
            <div>
              <label class="cursor-pointer" for="description"
                >Description</label
              >
            </div>
            <textarea
              class="input resize-none"
              name="description"
              id="description"
              placeholder="Task Description"
            ></textarea>
          </div>
          <div class="flex flex-col gap-1">
            <div>
              <label class="cursor-pointer" for="subtask">Subtasks</label>
            </div>
            <input
              class="input"
              type="text"
              id="subtask"
              placeholder="Add subtask"
            />
            <a
              class="text-indigo-500 cursor-pointer w-full text-center hover:text-indigo-400 py-2"
            >
              + Add New Subtask
            </a>

            <ul class="grid gap-2 mt-1">
              <li class="flex items-center gap-2">
                <p class="flex-1 px-2 py-1 bg-slate-300 dark:bg-gray-900">
                  asdfasdfasdf
                </p>
                <IconClose />
              </li>
              <li class="flex items-center gap-2">
                <p class="flex-1 px-2 py-1 bg-slate-300 dark:bg-gray-900">
                  hey adf
                </p>
                <IconClose />
              </li>
            </ul>
          </div>
          <div class="flex flex-col gap-1">
            <div><label class="cursor-pointer" for="status">Status</label></div>
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
                class="cursor-pointer px-2 relative py-1 w-full appearance-none bg-transparent outline-none border border-gray-900/10 dark:border-neutral-200/10 z-20"
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
      <template v-else-if="store.modalStatus === StatusModals.BOARD" #form>
        <form class="grid gap-4">
          <div class="flex flex-col gap-1">
            <div>
              <label class="cursor-pointer" for="board-title">Title</label>
            </div>
            <input
              class="input"
              type="text"
              id="board-title"
              placeholder="Board Title"
            />
          </div>
          <button
            class="text-neutral-200 bg-indigo-500 hover:bg-indigo-400 rounded-full w-full py-1"
          >
            Create Board
          </button>
        </form></template
      >
      <template v-else-if="store.modalStatus === StatusModals.CARD" #form>
        <div class="grid gap-4 mt-8">
          <ul class="grid gap-2">
            <li>
              <h4>Subtasks (2 of 3)</h4>
            </li>
            <li
              class="flex items-center gap-4 w-full px-2 py-2 bg-slate-300 dark:bg-gray-900"
            >
              <input type="checkbox" name="subtasks" id="subtask" checked />
              <label class="checked:line-through" for="subtask"
                >Subtask description</label
              >
            </li>
            <li
              class="flex items-center gap-4 w-full px-2 py-2 bg-slate-300 dark:bg-gray-900"
            >
              <input type="checkbox" name="subtasks" id="subtask" />
              <label for="subtask">Subtask description</label>
            </li>
          </ul>
          <div class="flex flex-col gap-1">
            <div><label class="cursor-pointer" for="status">Status</label></div>
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
                class="cursor-pointer px-2 relative py-1 w-full appearance-none bg-transparent outline-none border border-gray-900/10 dark:border-neutral-200/10 z-20"
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
        </div></template
      ><template v-else-if="store.modalStatus === StatusModals.COLUMN" #form>
        <form class="grid gap-4">
          <div class="flex flex-col gap-1">
            <div>
              <label class="cursor-pointer" for="Column-title">Title</label>
            </div>
            <input
              class="input"
              type="text"
              id="Column-title"
              placeholder="Column Title"
            />
          </div>
          <button
            class="text-neutral-200 bg-indigo-500 hover:bg-indigo-400 rounded-full w-full py-1"
          >
            Create Column
          </button>
        </form></template
      >
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
import { StatusModals } from "~/interfaces";
const store = useBoardStore();
</script>

<style scoped></style>
