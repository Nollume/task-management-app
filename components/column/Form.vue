<template>
  <form @submit.prevent="createColumn()" class="grid gap-4">
    <div class="flex flex-col gap-1">
      <div>
        <label class="cursor-pointer" for="Column-title">Title</label>
      </div>
      <div class="relative">
        <input
          @input="animateCircle"
          class="input pr-10"
          type="text"
          id="Column-title"
          placeholder="Column Title"
          required
          v-model="columnTitle"
        />
        <IconAnimateCircle
          @animateCircle="animateCircle = $event"
          :titleLength="titleLength"
          class="absolute top-1/2 right-1.5 -translate-y-1/2"
        />
      </div>
    </div>
    <div>
      <p class="mr-auto mb-1">Badge</p>
      <div
        class="grid grid-cols-8 gap-4 px-2 py-2 border border-gray-900/10 dark:border-neutral-200/10 sm:flex sm:gap-2 sm:items-center sm:justify-evenly"
      >
        <input
          v-for="color in badgesColors"
          :key="color"
          class="radioInput"
          :class="color"
          type="radio"
          name="badge"
          :value="color"
          required
          v-model="badge"
        />
      </div>
    </div>

    <button
      class="text-neutral-200 bg-indigo-500 hover:bg-indigo-400 rounded-full w-full py-1"
    >
      Create Column
    </button>
  </form>
</template>

<script setup lang="ts">
import { statuses } from "@/interfaces";
import { useBoardStore } from "@/stores/board";

const store = useBoardStore();

const columnTitle = ref<string>("");
const badge = ref<string>("");
const badgesColors = reactive<string[]>([
  "bg-red-500",
  "bg-gradient-to-r from-red-500 to-orange-500",
  "bg-orange-500",
  "bg-gradient-to-r from-orange-500 to-amber-300",
  "bg-amber-300",
  "bg-gradient-to-r from-amber-300 to-lime-500",
  "bg-lime-500",
  "bg-gradient-to-r from-lime-500 to-sky-500",
  "bg-sky-500",
  "bg-gradient-to-r from-sky-500 to-pink-500",
  "bg-pink-500",
  "bg-gradient-to-r from-pink-500 to-fuchsia-700",
  "bg-fuchsia-700",
  "bg-gradient-to-r from-fuchsia-700 to-rose-700",
  "bg-rose-700",
  "bg-emerald-700",
]);

const createColumn = () => {
  store.alert = false;
  if (columnTitle.value.length > store.maxTitleLength) {
    store.showAlertMsg("The title is too long!");
    return;
  }
  if (
    store.currentBoard?.columns.some(
      (item) =>
        item.statusTitle.toLowerCase() === columnTitle.value.toLowerCase()
    )
  ) {
    store.showAlertMsg("Column with this name already exists!");
    return;
  }
  const column: statuses = {
    statusTitle: columnTitle.value,
    badge: badge.value,
  };
  store.currentBoard?.columns.push(column);
  store.saveToLocalStorage(store.boards);

  store.alert = false;
  store.showAlertMsg(`Column "${columnTitle.value}" created!`, "succeed");
};

const titleLength = computed(() => columnTitle.value.length);

const animateCircle = ref<() => void>();
</script>

<style scoped></style>
