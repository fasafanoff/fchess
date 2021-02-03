import React from "react";
import { BoardContext } from "../BoardProvider/BoardProvider";
import style from "./Figure.module.scss";

class Piece extends React.Component {
  static contextType = BoardContext;
  constructor(props) {
    super(props);
    this.Ref = React.createRef();
  }

  componentDidMount() {
    this.rect = this.Ref.current.getBoundingClientRect();
  }

  render() {
    const { component, color } = this.props;

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
      >
        {component({ style: { color }, className: style["figure"] })}
      </div>
    );
  }
  onStartEvent = (e) => {
    const { setSelectedTile, game } = this.context;

    const { piece } = this.props.square;

    const color = game.getCurrentSide().name;

    /// you can't interact with white pieces if it's black's move
    if (color !== piece.side.name || !piece) {
      return;
    }
    

    setSelectedTile(this.props.square);
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
