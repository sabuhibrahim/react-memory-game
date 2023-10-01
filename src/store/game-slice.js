import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    currentLevel: null,
    levelCount: null,
  },
  reducers: {
    setData(state, action) {
      state.currentLevel = action.payload.currentLevel;
      state.levelCount = action.payload.levelCount;
    },
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice.reducer;
