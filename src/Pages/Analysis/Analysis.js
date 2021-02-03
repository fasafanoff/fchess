// import React from 'react';
import style from "./Analysis.module.scss";
import {Link } from "react-router-dom";

const Analysis = () => {
  const onMouseDown = event => {
  var endTarget = document.elementFromPoint(
  event.changedTouches[0].pageX,
  event.changedTouches[0].pageY
);
console.log(endTarget);
  }

  const onMouseDown2 = event => {

    var endTarget = document.elementFromPoint(
      event.changedTouches[0].pageX,
      event.changedTouches[0].pageY
    );
    console.log(endTarget);
  } 



    return (
      <div>
        <div onTouchEnd={onMouseDown} className={style.red}></div>
        <div onTouchEnd={onMouseDown2} className={style.blue}></div>
        analysis
        <Link to="/">Main</Link>
      </div>
    );
}

export default Analysis;
