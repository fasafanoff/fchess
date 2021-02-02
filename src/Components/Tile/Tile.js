import React from "react";

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
    canBeMovedTo
  } = props;
  //getting file and rank of the tile
  const { rank, file } = square;

  const {
    moveFunction,
  } = React.useContext(BoardContext);


  const onMouseUp = (e) => {
    if ( canBeMovedTo ) {
      moveFunction(file, rank);
    }
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
    
      onMouseUp={onMouseUp}
      rank={rank}
      file={file}
    >
      {component
        ? component({
            color: square.piece ? square.piece.side.name : "transparent",
            square,
          })
        : canBeMovedTo && <div>*</div>}
    </StyledTile>
  );
};

export default Tile;
