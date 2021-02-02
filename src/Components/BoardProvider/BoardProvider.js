import React,{useState,useEffect} from 'react';

const BoardContext = React.createContext(null);

const chess = require("chess");



class BoardProvider extends React.Component {
  constructor(props) {
    super(props);
    this.gameClient = chess.createSimple();
    this.holded = null;
    this.isWhite = true;
    this.state = {
      selectedTile: null,
      board: this.gameClient.game.board,
      validMoves: this.gameClient.getStatus().validMoves,
      moves: null,
    };


  }

  render() {
    
    return (
      <BoardContext.Provider
        value={{
          selectedTile: this.state.selectedTile,
          setSelectedTile:this.setSelectedTile,
          board: this.state.board,
          moveFunction: this.moveFunction,
          moves: this.state.moves,
          game: this.gameClient.game,
          holded:this.holded,
          setHolded:this.setHolded
        }}
      >
        {this.props.children}
      </BoardContext.Provider>
    );
  }

  setMoves = ({file,rank}) => {
    let moves = this.state
      .validMoves.filter(
        (move) =>
          move.src.file === file &&
          move.src.rank === rank
      );

      if (moves[0]) {
        this.setState({ moves: moves[0].squares });
      } else this.setState({ moves: null });
     
  };
  moveFunction = (fileTo, rankTo) => {
    console.log("move", fileTo, rankTo);
    this.gameClient.move(
      `${this.state.selectedTile.file}${this.state.selectedTile.rank}`,
      `${fileTo}${rankTo}`
    );
    this.setState({
      board: this.gameClient.game.board,
      validMoves: this.gameClient.getStatus().validMoves,
    });
    this.setMoves({ file:null,rank:null});
  };

  setSelectedTile = (value) => {
    console.log("setting new moves")
    this.setState({ selectedTile: value });
    this.setMoves(value);
  }

  setHolded = (value) =>{
    this.holded = value;
  }
}


export { BoardProvider, BoardContext };
