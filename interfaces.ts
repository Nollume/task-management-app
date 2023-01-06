export enum StatusModals {
  TASK = "TASK",
  BOARD = "BOARD",
  CARD = "CARD",
  COLUMN = "COLUMN",
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

interface statuses {
  statusTitle: string;
  badge: string;
}
export interface subtask {
  subtaskTitle: string;
  done: boolean;
}
