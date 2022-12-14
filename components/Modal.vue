<template>
  <div
    class="flex items-center justify-center fixed inset-0 bg-black/40 z-50"
    v-if="openModal"
  >
    <div class="w-[90%] p-4 rounded-xl bg-slate-200 dark:bg-gray-800">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg">
          <slot name="title" />
        </h3>
        <IconClose @click="openModal = false" />
      </div>
      <slot name="form" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
import { storeToRefs } from "pinia";
const { openModal } = storeToRefs(useBoardStore());
</script>
