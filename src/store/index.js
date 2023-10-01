import { configureStore } from "@reduxjs/toolkit";

import gameReducer from "./game-slice";
import memoryGameReducer from "./memoryGame-slice";
import alertReduser from "./alert-slice";

const store = configureStore({
  reducer: {
    game: gameReducer,
    memoryGame: memoryGameReducer,
    alert: alertReduser,
  },
});

export default store;
