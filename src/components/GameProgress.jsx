import React from "react";
import { useSelector } from "react-redux";
import memoryGameLogo from "assets/img/memory-game-logo.png";

const GameProgress = () => {
  const {
    currentLevel, levelCount
  } = useSelector(state => state.game);

  let levelProgressWidth = Math.round(currentLevel / levelCount * 100).toString() + "%";

  return (
    <div className="game-item-head">
      <div className="game-logo">
        <img src={memoryGameLogo} alt="logo" width="200" />
      </div>
      <div className="game-title">Memory Game</div>
      <div className="game-description-title">This is example Memory Game</div>
      <div className="game-progress-text">
        <span>{currentLevel}/{levelCount} level</span>
      </div>
      <div className="game-progress-bar">
        <div className="game-progress-line" style={{ width: levelProgressWidth }}></div>
      </div>
    </div>
  )
}

export default GameProgress
