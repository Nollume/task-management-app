<template>
  <div class="h-screen relative flex flex-col">
    <TheHeader  />
    <MainContent />
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from "~/stores/board";
const store = useBoardStore();

</script>
