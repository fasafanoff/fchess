import React from "react";
import { BoardContext } from "../BoardProvider/BoardProvider";
import style from "./Figure.module.scss";

class Piece extends React.Component {
  static contextType = BoardContext;
  constructor(props) {
    super(props);
    this.Ref = React.createRef();
    this.rect = null;
  }
  render() {
    const { component, color, square } = this.props;

    const { selectedTile, setSelectedTile, moveFunction } = this.context;
    const { file, rank } = square;

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
    const { setSelectedTile, game, setHolded } = this.context;

    const { file, rank, piece } = this.props.square;

    const isBlack = game.moveHistory.length & 1;

    const color = isBlack ? "black" : "white";

    if (!piece) {
      return;
    }

    if (color !== piece.side.name) {
      return;
    }

    setHolded({ ...this.props.square });
    ///
    /// you     target
    /// black   black
    /// black   white
    /// white   black
    /// white   white

    setSelectedTile({ file: file, rank: rank });

    this.Ref.current.style.cursor = "grabbing";
    this.Ref.current.style.transform = `scale(1.2)`;
    this.Ref.current.style.pointerEvents = `none`;

    this.rect = this.Ref.current.getBoundingClientRect();

    this.Ref.current.style.left = `${
      e.clientX - this.rect.left - this.rect.width / 2
    }px`;

    this.Ref.current.style.top = `${
      e.clientY - this.rect.top - this.rect.height / 2
    }px`;
    window.addEventListener("mouseup", this.onMouseUp);
    window.addEventListener("mousemove", this.onMouseMove);

    e.preventDefault();
  };
  onMouseMove = (e) => {
    const { selectedTile, setSelectedTile, moveFunction } = this.context;
    this.Ref.current.style.left = `${
      e.clientX - this.rect.left - this.rect.width / 2
    }px`;

    this.Ref.current.style.top = `${
      e.clientY - this.rect.top - this.rect.height / 2
    }px`;
  };

  onMouseUp = (e) => {

    console.log("ONONONONONONONN")
window.removeEventListener("mouseup", this.onMouseUp, { capture: true });
window.removeEventListener("mousemove", this.onMouseMove);
    e.preventDefault();
    const { holded, setHolded, moveFunction } = this.context;
    setHolded(null);
    if (!this.Ref.current) return;

    
    this.Ref.current.style.left = `0`;
    this.Ref.current.style.top = `0`;
    this.Ref.current.style.transform = `none`;
    this.Ref.current.style.cursor = "grab";
    this.Ref.current.style.pointerEvents = `all`;
  
    
  };
}

export default Piece;
