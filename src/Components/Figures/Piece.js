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
        onMouseDown={this.onMouseDown}
      >
        {component({ style: { color }, className: style["figure"] })}
      </div>
    );
  }
  onMouseDown = (e) => {
    const { setSelectedTile, game } = this.context;

    const { piece } = this.props.square;

    const color = game.getCurrentSide().name;

    if (!piece) {
      return;
    }

    if (color !== piece.side.name) {
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

    window.addEventListener("mouseup", this.onMouseUp);
    window.addEventListener("mousemove", this.onMouseMove);

    //// in order to prevent the user from selecting an svg
    e.preventDefault();
  };
  onMouseMove = (e) => {
    this.Ref.current.style.left = `${
      e.clientX - this.rect.left - this.rect.width / 2
    }px`;

    this.Ref.current.style.top = `${
      e.clientY - this.rect.top - this.rect.height / 2
    }px`;
  };

  onMouseUp = (e) => {
    window.removeEventListener("mouseup", this.onMouseUp);
    window.removeEventListener("mousemove", this.onMouseMove);
    document.body.style.cursor = "default";

    //if we didn't move the piece we need to restore its shape and position
    if (this.Ref.current) {
      this.Ref.current.style.left = `0`;
      this.Ref.current.style.top = `0`;
      this.Ref.current.style.transform = `none`;
      this.Ref.current.style.pointerEvents = `all`;
    }
  };
}

export default Piece;
