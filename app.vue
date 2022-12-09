<template>
  <div class="h-screen">WHAT!!!</div>
  <button
    @click="setColorTheme($colorMode.preference === 'dark' ? 'light' : 'dark')"
  >
    theme
  </button>
</template>

<script setup lang="ts">
import { useStoreStore } from "~/stores/store";
const store = useStoreStore();
/**
 * dark/light MODE
 */
type Theme = "light" | "dark";
const setColorTheme = (newTheme: Theme) => {
  useColorMode().preference = newTheme;
};
</script>
