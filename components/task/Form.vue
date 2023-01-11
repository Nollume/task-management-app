<template>
  <form @submit.prevent="createTask" class="grid gap-4">
    <div class="flex flex-col gap-1">
      <div><label class="cursor-pointer" for="title">Title</label></div>
      <input
        class="input"
        type="text"
        id="title"
        placeholder="Task Title"
        v-model="title"
        required
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
        required
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

      <TransitionGroup
        tag="ul"
        name="fade"
        v-show="subtasks.size"
        class="grid gap-2 mt-1"
      >
        <li
          v-for="task in subtasks"
          :key="task"
          class="flex items-center gap-2"
        >
          <p class="flex-1 px-2 py-1 bg-slate-300 dark:bg-gray-900 rounded-sm">
            {{ task }}
          </p>
          <IconClose @click.prevent="removeSubtask(task)" />
        </li>
      </TransitionGroup>
    </div>
    <div class="flex flex-col gap-1">
      <div><label class="cursor-pointer" for="status">Status</label></div>
      <div class="relative">
        <IconArrowDown />
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
import { subtask } from "@/interfaces";
import { generateRandomId } from "@/helpers/helper";
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

const getUniqueTaskId = () => {
  let id: number;
  if (!store.currentBoard?.tasks.length) id = 1;
  else id = Math.max(...store.currentBoard?.tasks.map((b) => b.taskId)) + 1;
  return id;
};
const createTask = () => {
  if (!title.value || !description.value) return;
  if (
    store.currentBoard?.tasks.some(
      (item) => item.taskTitle.toLowerCase() === title.value.toLowerCase()
    )
  ) {
    store.showAlertMsg("Task with this name already exists!");
    return;
  }

  let subTasksArr: subtask[] = [];

  for (const i of subtasks.value) {
    subTasksArr.push({
      subtaskTitle: i,
      done: false,
      subtaskId: generateRandomId(i),
    });
  }

  const task = {
    taskTitle: title.value,
    taskId: getUniqueTaskId(),
    taskDescription: description.value,
    subtasks: subTasksArr,
    status: status.value,
  };

  store.currentBoard?.tasks.push(task);
  store.saveToLocalStorage(store.boards);

  store.alert = false;
  store.showAlertMsg(`Task "${title.value}" created!`, "succeed");
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  scale: 0.8;
}
</style>
