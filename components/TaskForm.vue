<template>
  <form
    @submit.prevent="store.createTask(title, description, status, subtasks)"
    class="grid gap-4"
  >
    <div class="flex flex-col gap-1">
      <div><label class="cursor-pointer" for="title">Title</label></div>
      <input
        class="input"
        type="text"
        id="title"
        placeholder="Task Title"
        v-model="title"
      />
    </div>
    <div class="flex flex-col gap-1">
      <div>
        <label class="cursor-pointer" for="description">Description</label>
      </div>
      <textarea
        class="input resize-none"
        name="description"
        id="description"
        placeholder="Task Description"
        v-model="description"
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
        v-model="subtask"
      />
      <a
        @click.prevent="addSubtask"
        class="text-indigo-500 cursor-pointer w-full text-center hover:text-indigo-400 py-2"
      >
        + Add New Subtask
      </a>

      <ul v-show="subtasks.size" class="grid gap-2 mt-1">
        <li
          v-for="task in subtasks"
          :key="task"
          class="flex items-center gap-2"
        >
          <p class="flex-1 px-2 py-1 bg-slate-300 dark:bg-gray-900">
            {{ task }}
          </p>
          <IconClose @click.prevent="removeSubtask(task)" />
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
          v-model="status"
        >
          <option
            v-for="status in store?.currentBoard?.columns"
            :key="status.statusTitle"
            class="bg-slate-200 dark:bg-gray-800"
            :value="status.statusTitle"
          >
            {{ status.statusTitle }}
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

<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
const store = useBoardStore();
const title = ref<string>("");
const description = ref<string>("");
const status = ref<string>("todo");
const subtask = ref<string>("");
const subtasks = ref(new Set<string>());

const addSubtask = () => {
  if (!subtask.value) return;
  subtasks.value.add(subtask.value);

  subtask.value = "";
};
const removeSubtask = (task: string) => {
  subtasks.value.delete(task);
};
</script>

<style scoped></style>
