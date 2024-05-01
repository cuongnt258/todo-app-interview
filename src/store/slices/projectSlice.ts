import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store";
import TaskUtils from "@utils/Task";
import ToastUtils from "@utils/ToastUtils";
import { v4 } from "uuid";

import { FetchingState } from "@models/Common";
import { Project } from "@models/Project";
import { CompleteTask, Due, Task } from "@models/Task";

import ApiService from "@services/Api";
import LocalizationService from "@services/Localization";

import { InboxActions } from "./inboxSlice";

const { translations } = LocalizationService;

export type TaskState = {
  projectId: string;
  project?: Project;
  tasks: Task[];
  completedTasks: Task[];
};

const initialState: FetchingState & TaskState = {
  projectId: "",
  isLoading: false,
  error: null,
  tasks: [],
  completedTasks: [],
};

interface ProjectDataParams {
  id: string;
  isInbox?: boolean;
}

interface CompleteTaskParams {
  id: string;
  isInbox: boolean;
}

interface CreateTaskParams {
  due?: Due;
  description: string;
  content: string;
  priority: number;
  isInbox: boolean;
  projectId?: string;
  childOrder?: number;
}

interface UpdateTaskParams {
  id: string;
  description: string;
  content: string;
  isInbox: boolean;
}

interface DeleteTaskParams {
  id: string;
  isInbox?: boolean;
  isComplete: boolean;
}

const getProjectData = createAsyncThunk(
  "inbox/getDetail",
  async (params: ProjectDataParams, { dispatch, rejectWithValue }) => {
    try {
      const { id, isInbox } = params || {};

      const [inboxProjectData, completedTaskData] = await Promise.all([
        ApiService.post("/projects/get_data", {
          project_id: id,
        }),
        ApiService.post("/completed/get_all", {
          project_id: id,
          annotate_items: true,
        }),
      ]);

      const { project = null, items = [] } = inboxProjectData.data || {};
      const { items: completedItems = [] } = completedTaskData.data || {};

      const result = {
        project,
        tasks: items,
        completedTasks: completedItems.map((e: CompleteTask) => e.item_object),
      };

      if (isInbox) {
        dispatch(InboxActions.setInboxProjectData(result));
      } else {
        dispatch(actions.setProjectData({ ...result, id }));
      }

      return result;
    } catch (error) {
      ToastUtils.showError(translations.getProjectTasksFailed);
      return rejectWithValue(error);
    }
  },
);

export const completeTask = createAsyncThunk(
  "project/completeTask",
  async (
    { id, isInbox }: CompleteTaskParams,
    { getState, dispatch, rejectWithValue },
  ) => {
    const { setting, project } = getState() as RootState;

    try {
      const response = await ApiService.post("/sync", {
        resource_types: ["all"],
        sync_token: setting.sync_token,
        commands: [
          {
            type: "item_complete",
            uuid: v4(),
            args: { id, completed_at: new Date(Date.now()).toISOString() },
          },
        ],
      });

      const updatedItem = response.data?.items[0];

      if (isInbox) {
        dispatch(InboxActions.completeTask(updatedItem));
      } else {
        const { tasks, completedTasks } = project || {};

        dispatch(
          actions.setTasks({
            tasks: tasks.filter((task: Task) => task.id !== id),
            completedTasks: completedTasks.concat(updatedItem),
          }),
        );
      }

      ToastUtils.showSuccess(translations.completeTaskSuccess);
      return updatedItem;
    } catch (error) {
      ToastUtils.showError(translations.completeTaskFailed);
      return rejectWithValue(error);
    }
  },
);

const unCompleteTask = createAsyncThunk(
  "project/unCompleteTask",
  async (
    { id, isInbox }: CompleteTaskParams,
    { getState, dispatch, rejectWithValue },
  ) => {
    const { setting, project } = getState() as RootState;

    try {
      const response = await ApiService.post("/sync", {
        resource_types: ["all"],
        sync_token: setting.sync_token,
        commands: [
          {
            type: "item_uncomplete",
            uuid: v4(),
            args: { id },
          },
        ],
      });

      const updatedItem = response.data?.items[0];

      if (isInbox) {
        dispatch(InboxActions.unCompleteTask(updatedItem));
      } else {
        const { tasks, completedTasks } = project || {};

        dispatch(
          actions.setTasks({
            tasks: tasks.concat(updatedItem),
            completedTasks: completedTasks.filter(
              (task: Task) => task.id !== id,
            ),
          }),
        );
      }

      ToastUtils.showSuccess(translations.unCompleteTaskSuccess);
      return updatedItem;
    } catch (error) {
      ToastUtils.showError(translations.unCompleteTaskFailed);
      return rejectWithValue(error);
    }
  },
);

const createTask = createAsyncThunk(
  "project/createTask",
  async (
    {
      due,
      description,
      content,
      priority = 4,
      isInbox = false,
      projectId,
      childOrder = 0,
    }: CreateTaskParams,
    { getState, dispatch, rejectWithValue },
  ) => {
    const { setting } = getState() as RootState;
    const userId = setting?.user?.id ?? "";

    try {
      const response = await ApiService.post("/sync", {
        resource_types: ["all"],
        sync_token: setting.sync_token,
        commands: [
          {
            type: "item_add",
            uuid: v4(),
            args: {
              project_id: projectId,
              section_id: null,
              parent_id: null,
              checked: false,
              user_id: userId,
              collapsed: false,
              added_at: new Date(Date.now()).toISOString(),
              assigned_by_uid: null,
              responsible_uid: null,
              added_by_uid: userId,
              content: content,
              due: due,
              labels: [],
              priority: priority,
              duration: null,
              child_order: childOrder,
              description: description ?? undefined,
            },
            temp_id: TaskUtils.generateRandomId(),
          },
        ],
      });

      const updatedItem = response.data?.items[0];

      if (isInbox) {
        dispatch(InboxActions.addTask(updatedItem));
      } else {
        dispatch(actions.addTask(updatedItem));
      }
      ToastUtils.showSuccess(translations.createTaskSuccess);
      return updatedItem;
    } catch (error) {
      ToastUtils.showError(translations.createTaskFailed);
      return rejectWithValue(error);
    }
  },
);

const updateTask = createAsyncThunk(
  "project/updateTask",
  async (
    { id, description, content, isInbox = false }: UpdateTaskParams,
    { getState, dispatch, rejectWithValue },
  ) => {
    const { setting } = getState() as RootState;

    try {
      const response = await ApiService.post("/sync", {
        resource_types: ["all"],
        sync_token: setting.sync_token,
        commands: [
          {
            type: "item_update",
            uuid: v4(),
            args: {
              id: id,
              content: content,
              description: description,
            },
          },
        ],
      });

      const updatedItem = response.data?.items[0];

      if (isInbox) {
        dispatch(InboxActions.updateTask(updatedItem));
      } else {
        dispatch(actions.updateTask(updatedItem));
      }

      ToastUtils.showSuccess(translations.updateTaskSuccess);

      return updatedItem;
    } catch (error) {
      ToastUtils.showError(translations.updateTaskFailed);
      return rejectWithValue(error);
    }
  },
);

const deleteTask = createAsyncThunk(
  "project/deleteTask",
  async (
    { id, isInbox = false, isComplete }: DeleteTaskParams,
    { getState, dispatch, rejectWithValue },
  ) => {
    const { setting } = getState() as RootState;

    try {
      await ApiService.post("/sync", {
        resource_types: ["all"],
        sync_token: setting.sync_token,
        commands: [
          {
            type: "item_delete",
            uuid: v4(),
            args: {
              id: id,
            },
          },
        ],
      });

      if (isInbox) {
        dispatch(
          isComplete
            ? InboxActions.filterCompletedTask(id)
            : InboxActions.filterTask(id),
        );
      } else {
        dispatch(
          isComplete ? actions.filterCompletedTask(id) : actions.filterTask(id),
        );
      }

      ToastUtils.showSuccess(translations.deleteTaskSuccess);

      return id;
    } catch (error) {
      ToastUtils.showError(translations.deleteTaskFailed);
      return rejectWithValue(error);
    }
  },
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      const { tasks, completedTasks } = action.payload || {};

      state.tasks = tasks;
      state.completedTasks = completedTasks;
    },
    setProjectData: (state, action) => {
      const {
        id,
        project,
        tasks = [],
        completedTasks = [],
      } = action.payload || {};

      state.projectId = id;
      state.project = project;
      state.tasks = tasks;
      state.completedTasks = completedTasks;
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

const { reducer: ProjectReducer, actions } = projectSlice;

export default ProjectReducer;
export const ProjectActions = {
  ...actions,
  completeTask,
  unCompleteTask,
  getProjectData,
  createTask,
  deleteTask,
  updateTask,
};
