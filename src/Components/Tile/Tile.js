import React from "react";

import style from "./Tile.module.scss";

import { BoardContext } from "../BoardProvider/BoardProvider";

import { Queen, King, Knight, Bishop, Pawn, Rook } from "../Figures/Pieces";

////////////////////// styled tile /////////////////////////////
import styled, { css } from "styled-components";

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h"];
const StyledTile = styled.div`
  ${({ rank, file, flipped }) => {
    if (flipped)
      return css`
        grid-column: ${9 - (alphabet.indexOf(file) + 1)};
        grid-row: ${rank};
      `;
    else
      return css`
        grid-column: ${alphabet.indexOf(file) + 1};
        grid-row: ${9 - rank};
      `;
  }}
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
    canBeMovedTo,
    canBeMoved,
    sideColor,
  } = props;
  //getting file and rank of the tile
  const { rank, file } = square;

  const { moveFunction } = React.useContext(BoardContext);

  /// this event is onmouseup or ontouchend
  const onEndEvent = (e) => {
    if (e.type === "touchend") {
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
    } else if (canBeMovedTo) {
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
      }  
       ${selected ? style["selected"] : ""} ${
        props.isPrevMove ? style["last-move"] : ""
      } ${props.isPostMove ? style["post-move"] : ""}`}
      onMouseUp={onEndEvent}
      onTouchEnd={onEndEvent}
      rank={rank}
      file={file}
      flipped={flipped}
      
    >
      <div
        className={
          canBeMovedTo &&
          (component
            ? style["can-be-captured-tile"]
            : style["can-be-moved-to-tile"])
        }
      ></div>
      {component &&
        component({
          color: square.piece ? square.piece.side.name : "transparent",
          square,
          canBeMoved,
          sideColor
        })}
    </StyledTile>
  );
};

export default Tile;
