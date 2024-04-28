export enum Priority {
  None = 0,
  Low = 1,
  Medium = 3,
  High = 5,
}

export enum Status {
  Normal = 0,
  Completed = 2,
}

export interface Item {
  id: string;
  title: string;
  status: number;
  completedTime: string;
  isAllDay: boolean;
  sortOrder: number;
  startDate: string;
  timeZone: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  isAllDay: boolean;
  completedTime: string;
  content: string;
  desc: string;
  dueDate: string;
  items: Item[];
  priority: Priority;
  reminders: string[];
  repeatFlag: string;
  sortOrder: number;
  startDate: string;
  status: Status;
  timeZone: string;
}

export type TaskState = {
  projectId: string;
  tasks: Task[];
  isLoading: boolean;
  error?: string | null | Error;
};
