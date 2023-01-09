import { defineStore } from "pinia";
import { generateRandomId } from "@/helpers/helper";
import {
  StatusModals,
  board,
  task,
  subtask,
  statuses,
  column,
} from "~/interfaces";

export const useBoardStore = defineStore("board", {
  state: () => ({
    boards: [] as board[],
    currentBoardId: null as number | null,

    currentCardId: null as number | null,

    openModal: false as boolean,
    modalStatus: StatusModals.TASK as string,
    openTasksBar: false as boolean,

    alertMsg: "" as string,
    alert: false as boolean,
    alertColor: "" as string,

    columnToDelete: {} as column,

    timer: setTimeout(() => {}) as ReturnType<typeof setTimeout>,

    deleteCardModal: false as boolean,
    editableCard: false as boolean,
    editedCardTitle: "" as string,
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
    saveToLocalStorage(board: board[], close: number = 0) {
      const boardString = JSON.stringify(board);
      localStorage.setItem("boards", boardString);
      if (!close) {
        this.openModal = false;
      }
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
      if (
        this.boards.some(
          (item) => item.boardTitle.toLowerCase() === boardTitle.toLowerCase()
        )
      ) {
        this.showAlertMsg("Board with this name already exists!");
        return;
      }
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

      this.setCurrentBoardId(id);

      this.alert = false;
      this.showAlertMsg(`Board "${boardTitle}" created!`, "succeed");
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
      if (
        this.currentBoard?.tasks.some(
          (item) => item.taskTitle.toLowerCase() === taskTitle.toLowerCase()
        )
      ) {
        this.showAlertMsg("Task with this name already exists!");
        return;
      }

      let subTasksArr: subtask[] = [];

      for (const i of subtasks) {
        subTasksArr.push({
          subtaskTitle: i,
          done: false,
          subtaskId: generateRandomId(i),
        });
      }

      const task: task = {
        taskTitle,
        taskId: this.getUniqueTaskId(),
        taskDescription,
        subtasks: subTasksArr,
        status,
      };

      this.currentBoard?.tasks.push(task);
      this.saveToLocalStorage(this.boards);

      this.alert = false;
      this.showAlertMsg(`Task "${taskTitle}" created!`, "succeed");
    },
    /**
     * Columns
     */
    createColumn(statusTitle: string, badge: string) {
      if (
        this.currentBoard?.columns.some(
          (item) => item.statusTitle.toLowerCase() === statusTitle.toLowerCase()
        )
      ) {
        this.showAlertMsg("Column with this name already exists!");
        return;
      }
      const column: statuses = {
        statusTitle,
        badge,
      };
      this.currentBoard?.columns.push(column);
      this.saveToLocalStorage(this.boards);

      this.alert = false;
      this.showAlertMsg(`Column "${statusTitle}" created!`, "succeed");
    },
    removeColumnOpenModal(colInfo: column) {
      this.openModal = true;
      this.modalStatus = StatusModals.REMOVECOLUMN;
      this.columnToDelete = colInfo;
    },
  },
});
