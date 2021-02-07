import React from 'react';
import $ from "./Main.module.scss";
import { Link } from "react-router-dom";
import { BoardProvider } from "../../Components/BoardProvider/BoardProvider";
import Board from "../../Components/Board/Board";
import MoveHistory from '../../Components/MoveHistory/MoveHistory';
import ControlButtons from './../../Components/ControlButtons/ControlButtons';
const Main = () => {
    return (
      <div className={$.wrapper}>

        <BoardProvider>
          <Board />
          <div className={$.rightSide}>
            <MoveHistory />
            <ControlButtons/>
          </div>
        </BoardProvider>

        Main
        <Link to="/analysis/token">Analysis</Link>
        <Link to="/play/token">Play</Link>
      </div>
    );
}

export default Main;
