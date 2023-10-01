import { IMAGE_CARDS } from "./imageCards";
import { WORD_CARDS } from "./wordCards";

// Levels with sizes
const LEVELS = {
  1: "3x4", // 12 card
  2: "4x4", // 16 card
  3: "4x5", // 20 card
  4: "5x6", // 30 card
  5: "6x6", // 36 card
};

const MAX_CARD_COUNT = 20;

export const MAX_LEVEL = 5;

let currentLevel = 1;

// Update currentLevel;
export const setCurrentLevel = (level) => {
  currentLevel = level;
  localStorage.setItem("level", currentLevel);
};

export const getCurrentLevel = () => {
  let level = localStorage.getItem("level");
  if (level) {
    level = parseInt(level);
    currentLevel = level;
  }
  return currentLevel;
};

export const getLevelData = (level) => {
  //
  const size = LEVELS[level];
  const [row, col] = size.split("x");
  let count = (parseInt(row) * parseInt(col)) / 2;

  const nums = new Set();

  while (nums.size < count) {
    let num = Math.ceil(Math.random() * MAX_CARD_COUNT);
    if (num > 0) nums.add(num);
  }

  const images = [];
  const words = [];
  nums.forEach((num) => {
    images.push(IMAGE_CARDS.find((i) => i.id === num));
    words.push(WORD_CARDS.find((i) => i.id === num));
  });

  let gameCards = [...images, ...words];

  shuffleArray(gameCards);

  return {
    size: size,
    cards: gameCards,
  };
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};
