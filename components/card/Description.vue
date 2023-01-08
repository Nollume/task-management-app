<template>
  <div>
    <CardEditDelete />
    <p class="m-0">Description</p>
    <p
      class="p-4 mt-1 text-gray-900/60 dark:text-neutral-200/60 border border-gray-900/10 dark:border-neutral-200/10"
    >
      {{ store.currentCard?.taskDescription }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
const store = useBoardStore();
</script>

<style scoped></style>
