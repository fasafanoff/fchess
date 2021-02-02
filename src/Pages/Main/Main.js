import React from 'react';
// import style from "./Main.module.scss";
import { Link } from "react-router-dom";
import Board from "../../Components/Board/Board";
import{BoardProvider}from "../../Components/BoardProvider/BoardProvider";
const Main = () => {
    return (
      <div>
        <BoardProvider>
          <Board/>
        </BoardProvider>

        Main
        <Link to="/analysis/token">Analysis</Link>
        <Link to="/play/token">Play</Link>
      </div>
    );
}

export default Main;
