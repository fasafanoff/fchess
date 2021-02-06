import React from 'react';
import {BoardContext} from '../BoardProvider/BoardProvider';


const MoveHistoryElement = (props) => {
    const { setHistoryIndex } = React.useContext(BoardContext);
    const { move,index,placeholder } = props;
    const onClick = (e) => {
      setHistoryIndex(index);
    }

    return (
      <span onClick={onClick}>
        {`${
          move ?
          `${move.prevFile}${move.prevRank} ${move.postFile}${move.postRank}`
          :
          placeholder
        }`}
      </span>
    );
}

const MoveHistory = () => {
  const { game } = React.useContext(BoardContext);
    return (
      <div>
        <MoveHistoryElement move={null} moveHistory={[]} index={-1} placeholder="starting position"/>
        {game.moveHistory.map((move, i) => (
          <MoveHistoryElement
            key={i}
            move={move} 
            index={i}
          />
        ))}
      </div>
    );
}

export default MoveHistory;
