import React, { useEffect } from "react";
import MemoryGame from "components/MemoryGame";
import { useDispatch } from "react-redux";
import { getGameData } from "store/gameActions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGameData());
  }, [dispatch]);

  return <MemoryGame />;
}

export default App;
