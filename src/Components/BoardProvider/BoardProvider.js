import React from 'react';
import initSounds from '../../Utils/Sounds/Sounds';



const BoardContext = React.createContext(null);

const chess = require("chess");



class BoardProvider extends React.Component {
  constructor(props) {
    super(props);
    this.gameClient = chess.createSimple();
    this.state = {
      selectedTile: null,
      board: this.gameClient.game.board,
      validMoves: this.gameClient.getStatus().validMoves,
      moves: null,
    };
    initSounds(this.gameClient);
  }

  render() {
    
    return (
      <BoardContext.Provider
        value={{
          setSelectedTile:this.setSelectedTile,
          moveFunction: this.moveFunction,
          selectedTile: this.state.selectedTile,
          board: this.state.board,
          moves: this.state.moves,
          game: this.gameClient.game,
        }}
      >
        {this.props.children}
      </BoardContext.Provider>
    );
  }
   /// make sure that the selectedTile is up-to-date before using this function 
  setMoves = () => {
    /// if the tile is not selected yet , this happens exactly after the move
    /// (the tile gets deselected) so we need to set moves to null
    if (!this.state.selectedTile || !this.state.selectedTile.file) this.setState({ moves: null });
    else {
      
      let moves = this.state.validMoves.filter(
        (move) =>
        move.src.file === this.state.selectedTile.file &&
        move.src.rank === this.state.selectedTile.rank
      );
      this.setState({ moves:moves[0] && moves[0].squares });
    }
  };


  // the selected piece is moved to fileTo rankTo position
  moveFunction = (fileTo, rankTo) => {

    let promo = null; 
    
    if (this.state.selectedTile.piece.type === "pawn" && (rankTo === 8 || rankTo === 1)) {
      promo = "Q";
    }

    this.gameClient.move(
      `${this.state.selectedTile.file}${this.state.selectedTile.rank}`,
      `${fileTo}${rankTo}`,promo
    );


    this.setState({
      board: this.gameClient.game.board,
      validMoves: this.gameClient.getStatus().validMoves,
      selectedTile:null
    }, () => {
      this.setMoves();
    });
  };


  /// sets the selected tile and updates the moves that the player can make with the piece
  setSelectedTile = (value) => {
    this.setState({ selectedTile: value }, () => {
      /// we need a callback coz we need selectedTile to be up-to-date when using setMoves
      this.setMoves();
    });
  }

 
}


export { BoardProvider, BoardContext };
