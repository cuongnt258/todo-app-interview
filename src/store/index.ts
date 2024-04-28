import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";

import { ProjectReducer } from "./slices/project";
import { TaskReducer } from "./slices/task";

const store = configureStore({
  reducer: {
    project: ProjectReducer,
    task: TaskReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
