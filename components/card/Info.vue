<template>
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
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>