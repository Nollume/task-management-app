<template>
  <div
    class="whitespace-nowrap flex items-center gap-2 pb-2 mb-2 mx-1 border-b border-gray-900/10 dark:border-neutral-200/10"
  >
    <div
      class="w-4 h-4 rounded-full"
      :class="column.badge ? column.badge : 'bg-amber-400'"
    ></div>
    <h4 class="uppercase">
      {{ column.statusTitle }} ({{ tasksLength(column.statusTitle) }})
    </h4>
    <div
      v-if="
        column.statusTitle !== 'done' &&
        column.statusTitle !== 'todo' &&
        column.statusTitle !== 'doing'
      "
      @click="
        store.removeColumnOpenModal({
          statusTitle: column.statusTitle,
          index: index,
        })
      "
      class="ml-auto bg-red-400 hover:bg-red-300 p-1.5 rounded-md cursor-pointer"
    >
      <IconRemove />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/board";

const store = useBoardStore();
const props = defineProps<{
  column: { statusTitle: string; badge: string; } ;
  index: number;
  tasksLength: (columnStatus: string) => number | undefined;
}>();
</script>

<style scoped></style>
