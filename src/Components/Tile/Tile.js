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

/// this event is onmouseup or ontouchend
  const onEndEvent = (e) => {
    
    if(e.type ==="touchend")
    {
      /// here what we do is we call "mouseup" event of another tile that we touched 
      /// we do this workaround because of the way touchend works 
      /// it fires "ontouchend" event on a tile that was touch originated from.
      
      
      /// get the element that we need an event to fired upon. 
        var endTarget = document.elementFromPoint(
          e.changedTouches[0].pageX,
          e.changedTouches[0].pageY
      );


      /// create "mouseup" event coz it works the way we want.
      var event = new MouseEvent("mouseup", {
        bubbles: true,
        cancelable: true,
      });
      /// fire an event 
      endTarget.dispatchEvent(event);
    } 
    else if ( canBeMovedTo ) {
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
      onMouseUp={onEndEvent}
      onTouchEnd={onEndEvent}
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
