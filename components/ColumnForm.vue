<template>
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
    <div>
      <p class="mr-auto mb-1">Badge</p>
      <div
        class="flex items-center justify-evenly px-2 py-2 border border-gray-900/10 dark:border-neutral-200/10"
      >
        <input
          class="radioInput bg-red-500"
          type="radio"
          name="badge"
          checked
          value="bg-red-500"
        />
        <input
          class="radioInput bg-orange-500"
          type="radio"
          name="badge"
          value="bg-orange-500"
        />
        <input
          class="radioInput bg-amber-300"
          type="radio"
          name="badge"
          value="bg-amber-300"
        />
        <input
          class="radioInput bg-lime-500"
          type="radio"
          name="badge"
          value="bg-lime-500"
        />
        <input
          class="radioInput bg-sky-500"
          value="bg-sky-500"
          type="radio"
          name="badge"
        />
        <input
          class="radioInput bg-pink-500"
          value="bg-pink-500"
          type="radio"
          name="badge"
        />
        <input
          class="radioInput bg-fuchsia-500"
          value="bg-fuchsia-500"
          type="radio"
          name="badge"
        />
        <input
          class="radioInput bg-purple-700"
          value="bg-purple-700"
          type="radio"
          name="badge"
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

<script setup lang="ts"></script>

<style scoped></style>
