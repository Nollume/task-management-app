import { defineStore } from "pinia";
import { StatusModals } from "~/interfaces";

export const useBoardStore = defineStore("board", {
  state: () => ({
    boards: [] as object[],
    openModal: false as boolean,
    modalStatus: StatusModals.TASK as string,
    openTasksBar: false as boolean,
    mobileScreen: false as boolean,
  }),
  getters: {},
  actions: {
    screenResolution() {
      let mql = window.matchMedia("(min-width: 64rem)");

      if (mql.matches) {
        this.openTasksBar = true;
        this.mobileScreen = false;
      } else {
        this.openTasksBar = false;
        this.mobileScreen = true;
      }
    },
  },
});
