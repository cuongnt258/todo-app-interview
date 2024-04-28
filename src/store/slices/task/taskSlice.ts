import {createSlice} from '@reduxjs/toolkit';

import type {TaskState} from './type';

const initialState: TaskState = {
  projectId: '',
  isLoading: false,
  tasks: [],
  error: null,
};

const taskSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
});

export default taskSlice.reducer;
