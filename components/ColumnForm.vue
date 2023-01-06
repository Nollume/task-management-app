<template>
  <form
    @submit.prevent="store.createColumn(columnTitle, badge)"
    class="grid gap-4"
  >
    <div class="flex flex-col gap-1">
      <div>
        <label class="cursor-pointer" for="Column-title">Title</label>
      </div>
      <input
        class="input"
        type="text"
        id="Column-title"
        placeholder="Column Title"
        required
        v-model="columnTitle"
      />
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
</script>

<style scoped></style>
