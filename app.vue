<template>
  <div class="h-screen relative mx-auto overflow-hidden lg:flex">
    <Menu />

    <div class="h-full w-full flex flex-col flex-1 transition-all duration-500">
      <TheHeader />
      <MainContent />
      <ManageModal />
    </div>
    <Alert />
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from "~/stores/board";
const store = useBoardStore();

useHead({
  title: "Task management app",
  meta: [
    {
      name: "description",
      content: "Task management app.",
    },
  ],
});
onMounted(() => {
  store.getBoards();
});
</script>

<style></style>
