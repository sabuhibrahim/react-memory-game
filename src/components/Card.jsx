import React from "react";
import backgroundImage from "assets/img/background.png";

const Card = ({
  data,
  setStatus,
  index,
  size
}) => {
  let content = (data && data.status) ? (
    (data.type === 'img') ?
      <img src={data.value} alt="game-card" className="game-card-image" /> :
      <p className="game-card-text">{data.value}</p>
  ) : (
    <img src={backgroundImage} alt="game-card" className="game-card-image" />
  );

  let colClassName = "game-col game-col-" + size;
  return (
    <div className={colClassName}>
      <div className={
        (data && data.className)
          ? "game-card " + data.className :
          "game-card"
      } onClick={() => setStatus(index)}>
        <div className="game-card-content">{content}</div>
      </div>
    </div>
  )
}

export default Card;
