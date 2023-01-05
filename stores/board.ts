import { defineStore } from "pinia";
import { StatusModals, board } from "~/interfaces";

export const useBoardStore = defineStore("board", {
  state: () => ({
    boards: [] as board[],
    currentBoardId: null as number | null,
    openModal: false as boolean,
    modalStatus: StatusModals.TASK as string,
    openTasksBar: false as boolean,
  }),
  getters: {
    currentBoard: (state) => {
      return state.boards.find((b) => b.boardId === state.currentBoardId);
    },
  },
  actions: {
    validateStr(str: string, nmb: number = 8) {
      let newStr = str.substring(0, nmb);
      if (str.length > nmb) newStr = newStr + "...";
      return newStr;
    },
    saveToLocalStorage(board: board[]) {
      const boardString = JSON.stringify(board);
      localStorage.setItem("boards", boardString);
    },
    getStorageBoard() {
      const getBoard: board[] = JSON.parse(localStorage.getItem("boards")!);
      return getBoard;
    },
    getBoards() {
      if (!this.getStorageBoard()) return;
      this.boards = this.getStorageBoard();
      this.currentBoardId = +localStorage.getItem("currentBoardId")!;
    },
    getUniqueId() {
      let id: number;
      if (!this.getStorageBoard()) id = 1;
      else id = Math.max(...this.getStorageBoard().map((b) => b.boardId)) + 1;
      return id;
    },
    getCurrentBoardId(id: number) {
      this.currentBoardId = id;
      localStorage.setItem("currentBoardId", "" + id);
    },
    createBoard(boardTitle: string) {
      if (!boardTitle) return;
      const id = this.getUniqueId();
      const board = {
        boardTitle: boardTitle,
        boardId: id,
        columns: [
          { statusTitle: "todo", badge: "bg-indigo-500" },
          {
            statusTitle: "doing",
            badge: "bg-gradient-to-r from-indigo-500 to-amber-400",
          },
          {
            statusTitle: "done",
            badge: "bg-amber-400",
          },
        ],
        tasks: [],
      };

      if (!this.getStorageBoard()) {
        this.boards.push(board);
      } else {
        this.boards = this.getStorageBoard();

        this.boards.push(board);
      }

      this.saveToLocalStorage(this.boards);
      this.openModal = false;
      this.getCurrentBoardId(id);
    },
  },
});
