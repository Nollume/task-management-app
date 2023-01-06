<template>
  <Transition name="fadeIn">
    <div
      v-show="store.alertMsg.length"
      class="text-neutral-200 flex items-center gap-2 px-4 max-w-[15rem] py-2 bg-amber-600 absolute z-[999] rounded-md bottom-4 right-4"
    >
      <IconAlert />
      <p class="leading-4">{{ store.alertMsg }}</p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
const store = useBoardStore();
</script>

<style scoped>
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: all 0.3s ease-in;
}
.fadeIn-enter-from,
.fadeIn-leave-to {
  transform: translateX(100%);
  scale: 0.8;
  opacity: 0;
}
</style>
