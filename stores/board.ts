import { defineStore } from "pinia";
import { StatusModals, board, column } from "~/interfaces";

export const useBoardStore = defineStore("board", {
  state: () => ({
    boards: [] as board[],
    currentBoardId: null as number | null,

    currentCardId: null as number | null,

    openModal: false as boolean,
    isOpenModal: false as boolean,
    modalStatus: StatusModals.TASK as string,

    openTasksBar: false as boolean,
    isAnimating: false as boolean,

    alertMsg: "" as string,
    alert: false as boolean,
    alertColor: "" as string,

    columnToDelete: {} as column,

    timer: setTimeout(() => {}) as ReturnType<typeof setTimeout>,

    deleteCardModal: false as boolean,
    isDeleteCardModal: false as boolean,
    editableCard: false as boolean,
    editedCardTitle: "" as string,

    maxTitleLength: 30 as number,
  }),
  getters: {
    currentBoard: (state) => {
      return state.boards.find((b) => b.boardId === state.currentBoardId);
    },
    currentBoardIndex: (state): number => {
      return state.boards.findIndex(
        (board) => board.boardId === state.currentBoardId
      );
    },
    currentCard: (state) => {
      const currentBoard = state.boards.find(
        (b) => b.boardId === state.currentBoardId
      );

      return currentBoard?.tasks.find((t) => t.taskId === state.currentCardId);
    },
  },
  actions: {
    /**Alert msg */
    showAlertMsg(text: string, alertColor: string = "warn") {
      if (!this.alert) {
        window.clearTimeout(this.timer);
        this.alert = true;
        this.alertMsg = text;
        this.alertColor = alertColor;

        this.timer = setTimeout(() => {
          this.alert = false;
        }, 5000);
      }
    },
    /**handle modals */
    openModalFn() {
      this.openModal = true;
      this.editedCardTitle = "";
      setTimeout(() => {
        this.isOpenModal = true;
      }, 100);
    },
    closeModal() {
      this.openModal = false;
      this.isOpenModal = false;
      this.editableCard = false;
    },
    /**local storage */
    saveToLocalStorage(board: board[], close: number = 0) {
      const boardString = JSON.stringify(board);
      localStorage.setItem("boards", boardString);
      if (!close) {
        this.closeModal();
      }
    },
    getStorageBoard() {
      const getBoard: board[] = JSON.parse(localStorage.getItem("boards")!);
      return getBoard;
    },
    /**load initially board */
    getBoards() {
      if (!this.getStorageBoard()) return;
      this.boards = this.getStorageBoard();
      this.currentBoardId = +localStorage.getItem("currentBoardId")!;
    },

    setCurrentBoardId(id: number) {
      this.currentBoardId = id;
      localStorage.setItem("currentBoardId", "" + id);
    },
    /**
     * Columns
     */
    removeColumnOpenModal(colInfo: column) {
      this.openModalFn();
      this.modalStatus = StatusModals.REMOVECOLUMN;
      this.columnToDelete = colInfo;
    },
  },
});
