import React, { createRef } from "react";

import style from "./Tile.module.scss";

import { BoardContext } from "../BoardProvider/BoardProvider";

import { Queen, King, Knight, Bishop, Pawn, Rook } from "../Figures/Pieces";

////////////////////// styled tile /////////////////////////////
import styled, { css } from "styled-components";
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h"];
const StyledTile = styled.div`
  ${({ rank, file }) =>
    css`
      grid-column: ${alphabet.indexOf(file) + 1};
      grid-row: ${9 - rank};
    `}
`;

const MapPieceToComponents = {
  queen: Queen,
  king: King,
  knight: Knight,
  bishop: Bishop,
  pawn: Pawn,
  rook: Rook,
};

const Tile = (props) => {
  const {
    selected,
    square,
    flipped,
    dot /**dot means whether to show a dot in the center of the tile or not(can be moved to ) */,
  } = props;
  //getting file and rank of the tile
  const { rank, file } = square;

  const {
    selectedTile,
    setSelectedTile,
    moveFunction,
    holded,
    moves,
  } = React.useContext(BoardContext);

  const onClick = (event) => {
    console.log("clicking");
    if (dot) {
      if (!selected) {
        moveFunction(file, rank);
      }
    }
  };

  const onMouseUp = (e) => {
    
    console.log("HOLDEDHOLDEDHOLDED",holded);
    if (
      holded && moves&&
      moves.find((move) => move.file === file && move.rank === rank)
    ) {
      console.log("on mouse up 2");
      moveFunction(file, rank);
    }
  };

  const onMouseDown = (e) => {
    e.preventDefault();
  };




  let component = MapPieceToComponents[square.piece && square.piece.type];

  return (
    <StyledTile
      className={`${
        (rank + alphabet.indexOf(file)) & 1
          ? style["black-tile"]
          : style["white-tile"]
      }  ${flipped ? style["tile-flipped"] : ""} ${
        selected ? style["selected"] : ""
      }`}
      onClick={onClick}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      rank={rank}
      file={file}
    >
      {component
        ? component({
            color: square.piece ? square.piece.side.name : "transparent",
            square,
          })
        : dot && <div>*</div>}
    </StyledTile>
  );
};

export default Tile;
