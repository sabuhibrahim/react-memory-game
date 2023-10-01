import { gameActions } from "store/game-slice";
import { memoryGameActions } from "store/memoryGame-slice";
import {
  MAX_LEVEL,
  setCurrentLevel,
  getCurrentLevel,
  getLevelData,
} from "data/data";

export const getGameData = () => {
  return (dispatch) => {
    const currentLevel = getCurrentLevel();
    const { size, cards } = getLevelData(currentLevel);

    dispatch(
      gameActions.setData({
        levelCount: MAX_LEVEL,
        currentLevel: currentLevel,
      })
    );

    dispatch(
      memoryGameActions.setData({
        size,
        cards,
        cardCount: cards.length,
        attempt: calculateAttemtsCount(cards.length), // You can create algorith to calculate atempt size.
      })
    );
  };
};

export const updateLevel = (reset = false) => {
  return (dispatch) => {
    let currentLevel = getCurrentLevel();
    if (reset) {
      currentLevel = 1;
    } else {
      currentLevel++;
    }
    setCurrentLevel(currentLevel);
    const { size, cards } = getLevelData(currentLevel);

    dispatch(
      gameActions.setData({
        levelCount: MAX_LEVEL,
        currentLevel: currentLevel,
      })
    );

    dispatch(
      memoryGameActions.setData({
        size,
        cards,
        cardCount: cards.length,
        attempt: calculateAttemtsCount(cards.length),
      })
    );
  };
};

const calculateAttemtsCount = (count) => Math.ceil(count * 1.5);
