<template>
  <div class="h-screen relative mx-auto lg:flex">
    <Menu />

    <div class="h-full w-full flex flex-col flex-1 transition-all duration-500">
      <TheHeader />
      <MainContent />
      <ManageModal />
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from "~/stores/board";
const store = useBoardStore();
useHead({
  title: "Task management",
  meta: [
    {
      name: "description",
      content: "Task management app.",
    },
  ],
});
</script>

<style></style>
