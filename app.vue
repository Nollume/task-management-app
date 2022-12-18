<template>
  <div class="h-screen relative mx-auto max-w-[100rem] lg:flex">
    <template v-if="store.mobileScreen">
      <Transition name="showMenu">
        <Menu v-if="store.openTasksBar" />
      </Transition>
    </template>
    <template v-if="!store.mobileScreen">
      <Transition name="showMenu">
        <Menu :class="store.openTasksBar ? 'w-60' : 'w-20'" />
      </Transition>
    </template>

    <div class="h-full w-full flex flex-col flex-1 transition-all duration-500">
      <TheHeader />
      <MainContent />
      <ManageModal />
      <footer
        class="hidden w-full h-12 z-10 bg-slate-200 dark:bg-gray-800 2xl:block"
      ></footer>
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
onMounted(() => {
  window.addEventListener("resize", store.screenResolution);
});
</script>

<style>
.showMenu-enter-active,
.showMenu-leave-active {
  transition: all 0.3s ease-in;
}
.showMenu-enter-from,
.showMenu-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
