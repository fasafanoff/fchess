import React from 'react';
import style from "./Main.module.scss";
import { Link } from "react-router-dom";


const Main = () => {
    return (
      <div>
        Main
        <Link to="/analysis/token">Analysis</Link>
        <Link to="/play/token">Play</Link>
      </div>
    );
}

export default Main;
