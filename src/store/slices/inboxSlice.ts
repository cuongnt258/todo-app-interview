import { createSlice } from "@reduxjs/toolkit";

import { FetchingState } from "@models/Common";
import { Project } from "@models/Project";
import { Task } from "@models/Task";

export type ProjectModel = {
  projectId: string;
  project?: Project;
  tasks: Task[];
  completedTasks: Task[];
};

export type InboxSlice = FetchingState & ProjectModel;

const initialState: InboxSlice = {
  projectId: "",
  isLoading: false,
  error: null,
  project: undefined,
  tasks: [],
  completedTasks: [],
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    setInboxProjectId: (state, action) => {
      state.projectId = action.payload;
    },
    setInboxProjectData: (state, action) => {
      const { project, tasks = [], completedTasks = [] } = action.payload || {};

      state.project = project;
      state.tasks = tasks;
      state.completedTasks = completedTasks;
    },
    completeTask: (state, action) => {
      const { id } = action.payload;
      const { tasks, completedTasks } = state || {};

      return {
        ...state,
        tasks: tasks.filter((task: Task) => task.id !== id),
        completedTasks: completedTasks.concat(action.payload),
      };
    },
    unCompleteTask: (state, action) => {
      const { id } = action.payload;
      const { tasks, completedTasks } = state || {};

      return {
        ...state,
        tasks: tasks.concat(action.payload),
        completedTasks: completedTasks.filter((task: Task) => task.id !== id),
      };
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    filterTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task: Task) => task.id !== action.payload,
      );
    },
    filterCompletedTask: (state, action) => {
      state.completedTasks = state.completedTasks.filter(
        (task: Task) => task.id !== action.payload,
      );
    },
    updateTask: (state, action) => {
      const { id } = action.payload || {};

      state.tasks = state.tasks.map((task: Task) => {
        return task.id === id ? action.payload : task;
      });
    },
  },
});

const { reducer: InboxReducer, actions } = inboxSlice;

export default InboxReducer;
export const InboxActions = { ...actions };
