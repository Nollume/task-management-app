import { defineStore } from "pinia";
import { StatusModals, board, task, subtask } from "~/interfaces";

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
    getUniqueBoardId() {
      let id: number;
      if (!this.getStorageBoard()) id = 1;
      else id = Math.max(...this.getStorageBoard().map((b) => b.boardId)) + 1;
      return id;
    },
    setCurrentBoardId(id: number) {
      this.currentBoardId = id;
      localStorage.setItem("currentBoardId", "" + id);
    },
    createBoard(boardTitle: string) {
      if (!boardTitle) return;
      const id = this.getUniqueBoardId();
      const board: board = {
        boardTitle,
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
      this.setCurrentBoardId(id);
    },
    /**
     * TASKS
     */
    getUniqueTaskId() {
      let id: number;
      if (!this.currentBoard?.tasks.length) id = 1;
      else id = Math.max(...this.currentBoard?.tasks.map((b) => b.taskId)) + 1;
      return id;
    },
    createTask(
      taskTitle: string,
      taskDescription: string,
      status: string,
      subtasks: Set<string>
    ) {
      if (!taskTitle || !taskDescription) return;

      let subTasksArr: subtask[] = [];

      for (const i of subtasks) {
        subTasksArr.push({ subtaskTitle: i, done: false });
      }

      const task: task = {
        taskTitle,
        taskId: this.getUniqueTaskId(),
        taskDescription,
        subtasks: subTasksArr,
        status,
      };
      const currentBoard = this.boards.find(
        (b) => b.boardId === this.currentBoardId
      );
      currentBoard?.tasks.push(task);

      this.saveToLocalStorage(this.boards);

      this.openModal = false;
    },
  },
});
