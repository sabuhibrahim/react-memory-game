import { createSlice } from '@reduxjs/toolkit';


const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    show: false,
    type: null,
  },
  reducers: {
    success (state) {
      state.show = !state.show;
      state.type = 'success';
    },
    error (state) {
      state.show = !state.show;
      state.type = 'error';
    },
    warning (state) {
      state.show = !state.show;
      state.type = 'warning';
    },
    restore (state) {
      state.show = !state.show;
      state.type = 'end';
    },
    reset (state) {
      state.show = false;
      state.type = null;
    }
  }
});


export const alertActions = alertSlice.actions;

export default alertSlice.reducer;
