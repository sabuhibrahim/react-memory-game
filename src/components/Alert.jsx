import React from "react";
import { useSelector } from 'react-redux';

const Alert = ({ replayClick, type, showAlert, nextLevel }) => {

  const currentLevel = useSelector(state => state.game.currentLevel);
  const levelCount = useSelector(state => state.game.levelCount);
  let buttonDiv, title, description;

  switch (type) {
    case 'success':
      buttonDiv = <button type="button" className="alert--button" onClick={() => nextLevel(false)}>Next level</button>;
      title = 'Well Done!';
      description = `Congratulation! You have successfully completed ${currentLevel} of ${levelCount} levels of the game.`;
      break;
    case 'error':
      buttonDiv = <button type="button" className="alert--button" onClick={replayClick}>Replay</button>;
      title = "Dont' give up!";
      description = 'Replay the game and complete the game successfully. We trust you!';
      break;
    case 'warning':
      buttonDiv = (
        <div className="row">
          <div className="col-md-6">
            <button type="button" className="alert--button" onClick={replayClick}>Replay</button>
          </div>
          <div className="col-md-6">
            <button type="button" className="alert--button bg-dark" onClick={() => showAlert(false)} >Continue</button>
          </div>
        </div>
      );

      title = 'Whoops!';
      description = 'You have insufficient attempts left. Wanna try again?';
      break;
    case 'end':
      title = 'Congratulations!';
      description = 'All levels completed successfully!';
      buttonDiv = (
        <div className="row">
          <div className="col-md-6">
            <button type="button" className="alert--button">Finish</button>
          </div>
          <div className="col-md-6">
            <button type="button" className="alert--button bg-dark" onClick={() => nextLevel(true)} >Practice again</button>
          </div>
        </div>
      );
      break;
    default:
      break;
  }
  return (
    <div className="hero-box">
      <div className="container">
        <div className="row h-100 justify-content-center align-items-start">
          <div className="col-9 col-md-7 col-lg-6 col-xl-5 box">
            <div className="box-header text alert--header">
              Memory game
            </div>
            <div className="box-content">
              <div className="alert-description-header">{title}</div>
              <div className="alert-description">{description}</div>
              {buttonDiv}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Alert;
