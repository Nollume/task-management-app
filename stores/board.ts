import { defineStore } from "pinia";

export const useBoardStore = defineStore("board", {
  state: () => ({
    boards: [] as object[],
    openModal: false as boolean,
  }),
  getters: {},
  actions: {},
});
