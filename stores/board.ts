import { defineStore } from "pinia";
import { StatusModals } from "~/interfaces";

export const useBoardStore = defineStore("board", {
  state: () => ({
    boards: [] as object[],
    openModal: false as boolean,
    modalStatus: StatusModals.TASK as string,
    openTasksBar: false as boolean,
  }),
  getters: {},
  actions: {},
});
