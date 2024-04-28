import {createSlice} from '@reduxjs/toolkit';

import type {ProjectState} from './type';

const initialState: ProjectState = {
  isLoading: false,
  projects: [],
  error: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
});

export default projectSlice.reducer;
