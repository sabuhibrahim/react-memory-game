import { createSlice } from "@reduxjs/toolkit";

const memoryGameSlice = createSlice({
  name: "memoryGame",
  initialState: {
    size: null,
    attempt: null,
    cardCount: null,
    cards: [],
  },
  reducers: {
    setData(state, action) {
      state.size = action.payload.size;
      state.attempt = action.payload.attempt;
      state.cardCount = action.payload.cardCount;
      state.cards = action.payload.cards;
    },
    setCards(state, action) {
      state.cards = action.payload;
    },
    increaseAttempt(state) {
      state.attempt++;
    },
  },
});

export const memoryGameActions = memoryGameSlice.actions;

export default memoryGameSlice.reducer;
