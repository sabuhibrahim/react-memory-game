import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGameData, updateLevel } from "store/gameActions";
import { alertActions } from "store/alert-slice";

import Card from "./Card";
import Attempts from './Attempts';
import Alert from "./Alert";
import GameProgress from "./GameProgress";


const MemoryGame = () => {

  const dispatch = useDispatch();

  const {
    currentLevel, levelCount
  } = useSelector(state => state.game);

  const {
    size, attempt, cardCount, cards
  } = useSelector(state => state.memoryGame);

  const {
    show, type
  } = useSelector(state => state.alert);

  const [alert, showAlert] = useState(true);
  const [checkList, updateCheckList] = useState([]);
  const [finish, setFinish] = useState(0);
  const [currentAttempt, setAttempt] = useState(0);
  const [gameCards, updateGameCards] = useState([]);
  const [nextLevel, setNextLevel] = useState(false);
  const [levelReset, setLevelReset] = useState(false);

  const replayClick = () => {
    setAttempt(0);
    updateCheckList([]);
    setFinish(cardCount / 2);
    updateGameCards([]);
    dispatch(alertActions.reset());
    dispatch(getGameData());
  };

  const nextLevelClick = (reset = false) => {
    setAttempt(0);
    updateCheckList([]);
    setFinish(cardCount / 2);
    updateGameCards([]);
    dispatch(alertActions.reset());
    if (reset) {
      setLevelReset(true);
    } else {
      setNextLevel(true);
    }
  }

  useEffect(() => {
    setFinish(cardCount / 2);
    updateGameCards(cards.map(card => {
      return {
        ...card,
        status: false,
        className: null,
      };
    }));
  }, [cardCount, cards]);

  useEffect(() => {
    if (!nextLevel && !levelReset) return;
    dispatch(updateLevel(levelReset));
    setNextLevel(false);
    setLevelReset(false);
  }, [dispatch, nextLevel, setNextLevel, levelReset, setLevelReset]);



  const check = (index, updatedData) => {
    const updatedChecklist = [...checkList];
    if (updatedChecklist.length < 2) {
      updatedChecklist.push(index);
    }

    updateCheckList(updatedChecklist);
    updateGameCards(updatedData);

    if (updatedChecklist.length >= 2) {
      setTimeout(() => {
        let newAttempt = currentAttempt + 1;
        let newFinish = finish;
        const updatedData = [...gameCards];
        let first = updatedData[updatedChecklist[0]];
        let second = updatedData[updatedChecklist[1]];
        if (first.id === second.id) {
          newFinish--;
          setFinish(newFinish);
        } else {
          updatedData[updatedChecklist[0]].className = "close";
          updatedData[updatedChecklist[0]].status = false;
          updatedData[updatedChecklist[1]].className = "close";
          updatedData[updatedChecklist[1]].status = false;

          updateGameCards(updatedData);
        }
        setAttempt(newAttempt);
        updateCheckList([]);

        if (newFinish === 0) {
          if (currentLevel === levelCount) {
            dispatch(alertActions.restore());
          } else {
            dispatch(alertActions.success());
          }

          showAlert(true);
        } else {
          if (newAttempt >= attempt) {
            dispatch(alertActions.error());
            showAlert(true);
          }
          else if (newAttempt + newFinish > attempt) {
            dispatch(alertActions.warning());
          }
        }
      }, 600);
    }
  }

  const setStatus = (index, checkList) => {

    if (checkList.includes(index) || checkList.length === 2) {
      return
    }

    if (gameCards[index].status) {
      return
    }

    const updatedData = gameCards.map((item, i) => {
      const d = { ...item };
      if (index === i && !d.status) {
        d.className = "open";
        d.status = true;
      } else {
        d.className = null;
      }
      return d;
    });
    check(index, updatedData);
  };

  let cardsList = gameCards.map((item, index) => {
    return (
      <Card
        key={index}
        data={item}
        index={index}
        setStatus={
          () => setStatus(index, checkList)
        }
        size={size}
      />
    );
  });

  return (
    <div className="game w-100">
      {alert && show &&
        <Alert
          replayClick={replayClick}
          type={type}
          showAlert={showAlert}
          nextLevel={nextLevelClick}
        />
      }
      <div className="container">
        <div className="row content flex-wrap">
          <div className="col-md-7">
            <p className="game-name">Memory Game</p>
            <Attempts currentAttempt={currentAttempt} maxAttempt={attempt} />
            <div className="row main-game">
              {cardsList}
            </div>
          </div>
          <div className="col-lg-4 col-md-5 col-12 offset-lg-1 mb-4 mb-md-0 order-md-2 order-3">
            <div className="game-item">
              <GameProgress />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemoryGame;
