import React from "react";
import style from "./Board.module.scss";
import Tile from "../Tile/Tile";
import { BoardContext } from "../BoardProvider/BoardProvider";
const Board = () => {
  

  const {
    selectedTile,
    moves,
    game,
    historyIndex,
    flipped,
    validMoves
  } = React.useContext(BoardContext);

  let board = game.board;

  /// we need to construct a new game only if we wanna see the history of the game thus 
  /// all turns but the last
  if(historyIndex !== game.moveHistory.length - 1)
  {
    board = game.constructor.load(
     game.moveHistory.slice(0, historyIndex + 1)
    ).board;
  }


  let numerics = [8, 7, 6, 5, 4, 3, 2, 1];
  let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h"];

  

  if (flipped) {
    numerics = numerics.reverse();
    alphabet = alphabet.reverse();
  }

  //creating rank and file marks
  let numbers = numerics.map((i) => <div key={i}>{i}</div>);
  let letters = alphabet.map((letter) => <span key={letter}>{letter}</span>);


  let historicalMove = game.moveHistory[historyIndex]; 

  let sideColor = game.getCurrentSide().name;

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
          historicalMove &&
          file === historicalMove.prevFile &&
          rank === historicalMove.prevRank
        }
        isPostMove={
          historicalMove &&
          file === historicalMove.postFile &&
          rank === historicalMove.postRank
        }
        square={square}
        //if we flip the board we need to make sure, tiles also get flipped so pieces look normal
        flipped={flipped}
        canBeMovedTo={
          moves &&
          moves.find((move) => move.file === file && move.rank === rank)
        }
        canBeMoved={
          validMoves &&
          validMoves.find(({ src }) => src.file === file && src.rank === rank)
        }
        sideColor={sideColor}
      />
    );
  });

  return (
      <div className={style.wrapper}>
        <div className={style["letters"]}>{letters}</div>
        <div className={style["numbers"]}>{numbers}</div>
        <div
        className={`${style["tiles"]}`}
        >
          {tiles}
        </div>
        <div className={style["numbers"]}>{numbers}</div>
        <div className={style["letters"]}>{letters}</div>
      </div>
  );
};

export default Board;
