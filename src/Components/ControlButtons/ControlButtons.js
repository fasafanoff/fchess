import React from "react";
import { IconButton } from '@material-ui/core';
import { GiVerticalFlip } from 'react-icons/gi';
import { FaArrowLeft ,FaArrowRight} from "react-icons/fa";
import { BoardContext } from "../BoardProvider/BoardProvider";

const ControlButtons = () => {
  const {
    historyIndex,
    setHistoryIndex,
    flipped,
    flipBoard,
  } = React.useContext(BoardContext);
  return (
    <div>
      <IconButton
        color="primary"
        variant="outlined"
        onClick={() => flipBoard(!flipped)}
        title="next turn"
      >
        <GiVerticalFlip />
        
      </IconButton>
      <IconButton
        color="primary"
        variant="outlined"
        onClick={() => {
          setHistoryIndex(historyIndex - 1);
        }}
        title="previous turn"
      >
        <FaArrowLeft />
      </IconButton>
      <IconButton
        color="primary"
        variant="outlined"
        onClick={() => {
          setHistoryIndex(historyIndex + 1);
        }}
        title="Flip the board"
      >
        <FaArrowRight />
      </IconButton>
    </div>
  );
};

export default ControlButtons;
