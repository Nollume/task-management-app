<template>
  <form @submit.prevent="saveEditCard()" class="grid gap-4 mt-4">
    <ul class="grid gap-2" v-if="store.currentCard?.subtasks.length">
      <li>
        <h4>
          Subtasks ({{ completeSubtasks }} of
          {{ store.currentCard?.subtasks.length }})
        </h4>
      </li>
      <template v-if="store.editableCard">
        <li
          v-for="subtask in store.currentCard?.subtasks"
          :key="subtask.subtaskId"
          class="flex items-center gap-4 w-full px-2 py-2 bg-slate-300 dark:bg-gray-900 rounded-sm"
        >
          <input
            class="checkbox cursor-pointer"
            type="checkbox"
            name="subtasks"
            :value="subtask.subtaskTitle"
            :id="subtask.subtaskId"
            v-model="checkedSubtask"
          />
          <label class="cursor-pointer" :for="subtask.subtaskId">{{
            subtask.subtaskTitle
          }}</label>
        </li>
      </template>
      <template v-else>
        <li
          v-for="subtask in store.currentCard?.subtasks"
          :key="subtask.subtaskId"
          class="flex items-center gap-4 w-full px-4 py-2 bg-slate-300 dark:bg-gray-900 rounded-sm"
          :class="{ 'line-through': subtask.done }"
        >
          <p>{{ subtask.subtaskTitle }}</p>
        </li>
      </template>
    </ul>
    <p v-else>No subtasks</p>
    <div v-if="store.editableCard" class="flex flex-col gap-1">
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
    <div v-else>
      <p>Status:
        <span class="uppercase">{{ store?.currentCard?.status }}</span>
      </p>
    </div>
    <div v-if="store.editableCard" class="w-full grid grid-cols-2 gap-2">
      <a
        @click.pevent="cancelEditable"
        class="text-center text-neutral-200 bg-gray-500 hover:bg-gray-400 rounded-full py-1 cursor-pointer"
        >Cancel</a
      >
      <button
        class="text-neutral-200 bg-indigo-500 hover:bg-indigo-400 rounded-full py-1"
      >
        Save
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
const store = useBoardStore();

const props = defineProps<{
  description: string;
}>();

const checkedSubtask = ref<string[]>([]);
const status = ref<string>(store.currentCard?.status!);

const completeSubtasks = computed(() => {
  return store.currentCard?.subtasks.filter((task) => task.done).length;
});

const saveEditCard = () => {
  const oldTiltle = store.currentCard?.taskTitle;
  const title = store.editedCardTitle.length
    ? store.editedCardTitle
    : store.currentCard?.taskTitle;

  store.currentCard!.taskTitle = title!;
  store.currentCard!.taskDescription = props.description;
  store.currentCard!.status = status.value;

  for (const i of store.currentCard?.subtasks!) {
    checkedSubtask.value.includes(i.subtaskTitle)
      ? (i.done = true)
      : (i.done = false);
  }

  store.editedCardTitle = "";

  store.saveToLocalStorage(store.boards, 1);
  store.alert = false;
  store.showAlertMsg(`Task "${oldTiltle}" has been edited.`, "succeed");
  store.editableCard = false;
};

const chceckInputs = () => {
  checkedSubtask.value.length = 0;
  for (const i of store.currentCard?.subtasks!) {
    if (i.done) {
      if (checkedSubtask.value.includes(i.subtaskTitle)) return;
      checkedSubtask.value.push(i.subtaskTitle);
    }
  }
};
const cancelEditable = () => {
  chceckInputs();
  store.editableCard = false;
};

onMounted(() => {
  chceckInputs();
});
</script>

<style scoped></style>
