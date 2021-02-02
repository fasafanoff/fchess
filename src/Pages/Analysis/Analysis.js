// import React from 'react';
import style from "./Analysis.module.scss";
import {Link } from "react-router-dom";

const Analysis = () => {
  const onMouseDown = e => {
    console.log("down 1")

  }

  const onMouseDown2 = e => {
    console.log("down 2 ")
  } 



    return (
      <div>
        <div onClick={onMouseDown} className={style.red}></div>
        <div onClick={onMouseDown2} className={style.blue}></div>
        analysis
        <Link to="/">Main</Link>
      </div>
    );
}

export default Analysis;
