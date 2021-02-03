import React from 'react';
// import style from "./Main.module.scss";
import { Link } from "react-router-dom";
import { BoardProvider } from "../../Components/BoardProvider/BoardProvider";
import Board from "../../Components/Board/Board";
import MoveHistory from '../../Components/MoveHistory/MoveHistory';
const Main = () => {
    return (
      <div>
        <BoardProvider>
          <Board />
          <MoveHistory/>
        </BoardProvider>

        Main
        <Link to="/analysis/token">Analysis</Link>
        <Link to="/play/token">Play</Link>
      </div>
    );
}

export default Main;
