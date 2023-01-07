export enum StatusModals {
  TASK = "TASK",
  BOARD = "BOARD",
  CARD = "CARD",
  COLUMN = "COLUMN",
  REMOVECOLUMN = "REMOVECOLUMN",
  REMOVEBOARD = "REMOVEBOARD",
  EDITBOARD = "EDITBOARD",
}

export interface board {
  boardTitle: string;
  boardId: number;
  columns: statuses[];
  tasks: task[];
}

export interface task {
  taskTitle: string;
  taskId: number;
  taskDescription: string;
  subtasks: subtask[];
  status: string;
}

export interface statuses {
  statusTitle: string;
  badge: string;
}
export interface subtask {
  subtaskTitle: string;
  done: boolean;
}

export interface column {
  statusTitle: string;
  index: number;
}
