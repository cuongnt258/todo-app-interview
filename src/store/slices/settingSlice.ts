import Toast from "react-native-toast-message";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store";
import TaskUtils from "@utils/Task";
import { v4 } from "uuid";

import { FetchingState } from "@models/Common";
import { Project } from "@models/Project";
import { Filter, Label, Stats, User } from "@models/Setting";

import ApiService from "@services/Api";
import LocalizationService from "@services/Localization";

import { InboxActions } from "./inboxSlice";

const { translations } = LocalizationService;

interface SettingState {
  filters: Filter[];
  labels: Label[];
  stats: Stats;
  projects: Project[];
  sync_token: string;
  isShowCompleted: boolean;
  user?: User;
}

interface CreateProjectParams {
  name: string;
  childOrder?: number;
}

interface UpdateProjectParams {
  id: string;
  name: string;
}

const initialState: FetchingState & SettingState = {
  isLoading: false,
  error: null,
  filters: [],
  labels: [],
  projects: [],
  stats: {
    completed_count: 0,
    days_items: [],
    week_items: [],
  },
  sync_token: "",
  isShowCompleted: true,
  user: undefined,
};

export const syncAll = createAsyncThunk(
  "setting/syncAll",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await ApiService.post("/sync", {
        sync_token: "*",
        resource_types: ["labels", "projects", "filters", "user"],
      });

      const { filters, labels, stats, projects, sync_token, user } =
        response.data || ({} as SettingState);

      dispatch(
        InboxActions.setInboxProjectId(
          projects.find((project: Project) => project.inbox_project)?.id,
        ),
      );

      return { filters, labels, stats, sync_token, user, projects };
    } catch (error) {
      Toast.show({
        text1: translations.syncFailed,
        type: "success",
        position: "bottom",
        visibilityTime: 1000,
      });
      return rejectWithValue(error);
    }
  },
);

const createProject = createAsyncThunk(
  "setting/createProject",
  async (
    { name, childOrder }: CreateProjectParams,
    { getState, rejectWithValue },
  ) => {
    const { setting } = getState() as RootState;

    try {
      const response = await ApiService.post("/sync", {
        resource_types: ["all"],
        sync_token: setting.sync_token,
        commands: [
          {
            type: "project_add",
            uuid: v4(),
            temp_id: TaskUtils.generateRandomId(),
            args: {
              name: name,
              color: "charcoal",
              parent_id: null,
              child_order: childOrder,
              is_favorite: false,
              view_style: "list",
              is_invite_only: false,
              can_assign_tasks: false,
            },
          },
        ],
      });

      const updatedProject = response.data?.projects[0];

      Toast.show({
        text1: translations.createProjectSuccess,
        type: "success",
        position: "bottom",
        visibilityTime: 1000,
      });

      return updatedProject;
    } catch (error) {
      Toast.show({
        text1: translations.createProjectFailed,
        type: "error",
        position: "bottom",
        visibilityTime: 1000,
      });
      return rejectWithValue(error);
    }
  },
);

const updateProject = createAsyncThunk(
  "setting/updateProject",
  async ({ id, name }: UpdateProjectParams, { getState, rejectWithValue }) => {
    const { setting } = getState() as RootState;

    try {
      const response = await ApiService.post("/sync", {
        resource_types: ["all"],
        sync_token: setting.sync_token,
        commands: [
          {
            type: "project_update",
            uuid: v4(),
            args: {
              id: id,
              name: name,
              color: "charcoal",
            },
          },
        ],
      });

      const updatedProject = response.data?.projects[0];

      Toast.show({
        text1: translations.updateProjectSuccess,
        type: "success",
        position: "bottom",
        visibilityTime: 1000,
      });

      return updatedProject;
    } catch (error) {
      Toast.show({
        text1: translations.updateProjectFailed,
        type: "error",
        position: "bottom",
        visibilityTime: 1000,
      });
      return rejectWithValue(error);
    }
  },
);

const deleteProject = createAsyncThunk(
  "setting/deleteProject",
  async (id: string, { getState, rejectWithValue }) => {
    const { setting } = getState() as RootState;

    try {
      await ApiService.post("/sync", {
        resource_types: ["all"],
        sync_token: setting.sync_token,
        commands: [
          {
            type: "project_delete",
            uuid: v4(),
            args: {
              id: id,
            },
          },
        ],
      });

      Toast.show({
        text1: translations.deleteProjectSuccess,
        type: "success",
        position: "bottom",
        visibilityTime: 1000,
      });

      return id;
    } catch (error) {
      Toast.show({
        text1: translations.deleteProjectFailed,
        type: "error",
        position: "bottom",
        visibilityTime: 1000,
      });
      return rejectWithValue(error);
    }
  },
);

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setSyncToken: (state, action) => {
      state.sync_token = action.payload;
    },
    setShowCompletedTask: (state, action) => {
      state.isShowCompleted = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncAll.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(syncAll.fulfilled, (state, action) => {
        const { filters, labels, stats, projects, sync_token, user } =
          action.payload as SettingState;

        state.filters = filters;
        state.labels = labels;
        state.stats = stats;
        state.projects = projects;
        state.sync_token = sync_token;
        state.user = user;

        state.isLoading = false;
        state.error = null;
      })
      .addCase(syncAll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error as Error;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const { id } = action.payload || {};
        state.projects = state.projects.map((project: Project) => {
          return project.id === id ? action.payload : project;
        });
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (project: Project) => project.id !== action.payload,
        );
      });
  },
});

const { reducer: SettingReducer, actions } = settingSlice;

export default SettingReducer;
export const SettingActions = {
  ...actions,
  createProject,
  updateProject,
  deleteProject,
};
