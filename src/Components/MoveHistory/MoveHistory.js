import React from "react";
import { BoardContext } from "../BoardProvider/BoardProvider";
import $ from "./MoveHistory.module.scss";

const MoveHistory = () => {
  const { game } = React.useContext(BoardContext);
  return (
    <div className={$.wrapper}>
    <div className={$.title}>Game Notation</div>
      <div className={$.content}>
        <MoveHistoryElement
          move={null}
          moveHistory={[]}
          index={-1}
          placeholder="starting position"
        />
        {game.moveHistory.map((move, i) => (
          <MoveHistoryElement key={i} move={move} index={i} />
        ))}
      </div>
    </div>
  );
};


const MoveHistoryElement = (props) => {
  const { setHistoryIndex } = React.useContext(BoardContext);
  const { move, index, placeholder } = props;
  const onClick = (e) => {
    setHistoryIndex(index);
  };


  return (
    <span onClick={onClick} className={$.move}>
      {`${
        move
          ? `${move.prevFile}${move.prevRank} ${move.postFile}${move.postRank}`
          : placeholder
      }`}
    </span>
  );
};
export default MoveHistory;
