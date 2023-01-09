<template>
  <div>
    <CardEditDelete />
    <p class="m-0">Description</p>
    <p
      v-if="!store.editableCard"
      class="px-4 py-2 mt-1 text-gray-900/60 dark:text-neutral-200/60 border border-gray-900/10 dark:border-neutral-200/10"
    >
      {{ store.currentCard?.taskDescription }}
    </p>
    <input
      @input="sendDescription"
      v-else
      class="w-full px-4 py-2 mt-1 bg-slate-200 dark:bg-gray-800 text-gray-900/60 dark:text-neutral-200/60 border border-indigo-500 outline-none"
      type="text"
      v-model="description"
    />
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
const store = useBoardStore();

const description = ref<string>(store.currentCard?.taskDescription!);
const emit = defineEmits<{ (e: "sendDescription", value: string): void }>();

const sendDescription = (): void => {
  emit("sendDescription", description.value);
};
onMounted(() => {
  sendDescription();
});
</script>

<style scoped></style>
