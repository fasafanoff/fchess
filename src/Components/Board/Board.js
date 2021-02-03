import React from "react";
import style from "./Board.module.scss";
import Tile from "../Tile/Tile";
import { BoardContext } from "../BoardProvider/BoardProvider";



////material ui button 
import { IconButton } from "@material-ui/core";
import { GiVerticalFlip }   from "react-icons/gi";



const Board = () => {
  const [flipped, setFlipped] = React.useState(false);
  const { selectedTile, board,moves,game } = React.useContext(BoardContext);

  let numerics = [8, 7, 6, 5, 4, 3, 2, 1];
  let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h"];

  

  if (flipped) {
    numerics = numerics.reverse();
    alphabet = alphabet.reverse();
  }

  //creating rank and file marks
  let numbers = numerics.map((i) => <div key={i}>{i}</div>);
  let letters = alphabet.map((letter) => <span key={letter}>{letter}</span>);

  // console.log(game)



  let lasthistory = game.moveHistory[game.moveHistory.length - 1];

  //creating tiles
  let tiles = board.squares.map((square) => {
    const { file, rank } = square;
    return (
      <Tile
        key={`${file}${rank}`}
        selected={
          selectedTile &&
          selectedTile.file === file &&
          selectedTile.rank === rank
        }
        isPrevMove={
          lasthistory &&
          file === lasthistory.prevFile &&
          rank === lasthistory.prevRank
        }
        isPostMove={
          lasthistory &&
          file === lasthistory.postFile &&
          rank === lasthistory.postRank
        }
        square={square}
        //if we flip the board we need to make sure, tiles also get flipped so pieces look normal
        flipped={flipped}
        canBeMovedTo={
          moves &&
          moves.find((move) => move.file === file && move.rank === rank)
        }
      />
    );
  });

  return (
    <>
      <div className={style.wrapper}>
        <div className={style["letters"]}>{letters}</div>
        <div className={style["numbers"]}>{numbers}</div>
        <div
          className={`${style["tiles"]} ${flipped && style["tiles-flipped"]}`}
        >
          {tiles}
        </div>
        <div className={style["numbers"]}>{numbers}</div>
        <div className={style["letters"]}>{letters}</div>
      </div>
      <IconButton
        color="primary"
        variant="outlined"
        onClick={() => setFlipped(!flipped)}
        title="Flip the board"
      >
        <GiVerticalFlip />
      </IconButton>
    </>
  );
};

export default Board;
