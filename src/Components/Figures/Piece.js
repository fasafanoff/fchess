import React from "react";
import { BoardContext } from "../BoardProvider/BoardProvider";
import style from "./Figure.module.scss";

class Piece extends React.Component {
  static contextType = BoardContext;
  constructor(props) {
    super(props);
    this.Ref = React.createRef();
  }
  render() {
    const { component, color,canBeMoved,sideColor } = this.props;




    return (
      <div
        ref={this.Ref}
        className={style["figure-wrapper"]}
        onMouseDown={(e) => {
          this.onStartEvent(e);
          //// in order to prevent the user from selecting an svg
          //// on touch-based devices selecting of svg is not possible
          e.preventDefault();
        }}
        onTouchStart={this.onStartEvent}
        onMouseEnter={this.onEnterEvent}
      >
        {component({
          style: {
            color: this.determineColor(color, canBeMoved, sideColor),
          },
          className: style["figure"],
        })}
      </div>
    );
  }
  onEnterEvent = () => {
    const { piece } = this.props.square;
    const { sideColor: color, canBeMoved } = this.props;

    /// you can't interact with white pieces if it's black's move
    if (!piece || color !== piece.side.name || !canBeMoved)
      this.Ref.current.style.cursor = "arrow";
    else
      this.Ref.current.style.cursor = "grab";
  }

  determineColor(piece_color,canBeMoved,whos_move_color)
  {
    if (this.context.historyIndex !== this.context.game.moveHistory.length - 1)
      return piece_color;


    if (canBeMoved)
      return piece_color;
    else {
      if (whos_move_color === piece_color) {
        if (piece_color === "white")
          return "lightgray";
        else return "dimgray";
      }
      else return piece_color;

    };
  }


  onStartEvent = (e) => {
    const { setSelectedTile } = this.context;


    const { piece } = this.props.square;

  

    const { sideColor: color } = this.props;
    
    /// you can't interact with white pieces if it's black's move
    if (!piece||color !== piece.side.name) {
      return;
    }

    setSelectedTile(this.props.square);
    ///
    /// !!! doggy line
    /// in order to change the cursor type we need to
    /// have pointer-events not to equal to "none"
    /// but in our case we do, because the events do not go through elements
    /// and pointer-events "none" allows events to go through ,
    /// as we simple move the piece element to mouse-pointer as we drag it,
    /// it blocks the way to trigger the mouse-down event on tile
    /// but we still need to change the cursor to "grabbing"
    ///

    document.body.style.cursor = "grabbing";

    this.Ref.current.style.transform = `scale(1.2)`;

    this.Ref.current.style.pointerEvents = `none`;

    

    this.rect = this.Ref.current.getBoundingClientRect();
    this.Ref.current.style.left = `${
      e.clientX - this.rect.left - this.rect.width / 2
    }px`;

    this.Ref.current.style.top = `${
      e.clientY - this.rect.top - this.rect.height / 2
    }px`;

    if (e.type === "touchstart") {
      window.addEventListener("touchend", this.onEndEvent);
      window.addEventListener("touchmove", this.onMoveEvent);
    } else {
      window.addEventListener("mouseup", this.onEndEvent);
      window.addEventListener("mousemove", this.onMoveEvent);
    }
  };
  onMoveEvent = (e) => {
    // e.preventDefault();
    let clientX = (e.touches && e.touches[0].clientX) || e.clientX;
    let clientY = (e.touches && e.touches[0].clientY) || e.clientY;


    
    this.Ref.current.style.left = `${
      clientX - this.rect.left - this.rect.width / 2
    }px`;

    this.Ref.current.style.top = `${
      clientY - this.rect.top - this.rect.height / 2
    }px`;
  };

  onEndEvent = (e) => {
    if (e.type === "touchend") {
      window.removeEventListener("touchend", this.onEndEvent);
      window.removeEventListener("touchmove", this.onMoveEvent);
    } else {
      window.removeEventListener("mouseup", this.onEndEvent);
      window.removeEventListener("mousemove", this.onMoveEvent);
    }
    //if we didn't move the piece we need to restore its shape and position
    if (this.Ref.current) {
      this.Ref.current.style.left = `0`;
      this.Ref.current.style.top = `0`;
      this.Ref.current.style.transform = `none`;
      this.Ref.current.style.pointerEvents = `all`;
    }

    document.body.style.cursor = "default";
  };
}

export default Piece;
