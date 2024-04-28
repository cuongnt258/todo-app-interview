import { Task } from "../task/type";

export enum ViewMode {
  List = "list",
  Kanban = "kanban",
  Timeline = "timeline",
}

export enum Permission {
  Read = "read",
  Write = "write",
  Comment = "comment",
}

export enum Kind {
  Task = "TASK",
  Note = "NOTE",
}

export type ProjectState = {
  isLoading: boolean;
  projects: Project[];
  error?: string | null | Error;
};

export interface Project {
  id: string;
  name: string;
  color: string;
  sortOrder: number;
  closed: boolean;
  groupId: string;
  viewMode: ViewMode;
  permission: Permission;
  kind: Kind;
}

export interface Column {
  id: string;
  projectId: string;
  name: string;
  sortOrder: number;
}

export interface ProjectData {
  project: Project;
  tasks: Task[];
  columns: Column[];
}
