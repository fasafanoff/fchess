import React from 'react';
import { initSounds, playSound } from "../../Utils/Sounds/Sounds";
import chess from "chess";
const BoardContext = React.createContext(null);

class BoardProvider extends React.Component {
  constructor(props) {
    super(props);
    this.gameClient = chess.createSimple();
    this.game = this.gameClient.game;
    this.moveHistory = this.game.moveHistory;

    this.state = {
      selectedTile: null,
      board: this.gameClient.game.board,
      validMoves: this.gameClient.getStatus().validMoves,
      moves: null,
      historyIndex: -1,
      flipped: false,
    };

    initSounds(this.gameClient);

    this.gameClient.on("move", () => {
      this.setState({ historyIndex: this.moveHistory.length - 1 }, () => {
        const move = this.moveHistory[this.state.historyIndex];
        move.isCheck = this.gameClient.isCheck;
        move.isCheckmate = this.gameClient.isCheckmate;
      });
    });
  }

  render() {
    return (
      <BoardContext.Provider
        value={{
          setSelectedTile: this.setSelectedTile,
          selectedTile: this.state.selectedTile,
          moves: this.state.moves, /// moves that can be played with the selected tile
          historyIndex: this.state.historyIndex, /// index of the selected turn of the game(to display)
          board: this.state.board,
          game: this.gameClient.game,
          client: this.gameClient,
          validMoves:this.state.validMoves,
          setHistoryIndex: this.setHistoryIndex,
          moveFunction: this.moveFunction,
          flipped: this.state.flipped,
          flipBoard:this.flipBoard,
        }}
      >
        {this.props.children}
      </BoardContext.Provider>
    );
  }

  flipBoard = () => {
    this.setState({ flipped: !this.state.flipped });
  };

  setHistoryIndex = (value) => {
    value = Math.min(value, this.moveHistory.length - 1);
    value = Math.max(value, -1);

    //if the value is the same we don't want to play the sound once again
    if (value === this.state.historyIndex) return;

    this.setState({ historyIndex: value });
    let move = this.gameClient.game.moveHistory[value];

    /// if the move is the first one we quit
    if (!move) return;
    /// play the sounds
    else playSound(move);
  };

  /// make sure that the selectedTile is up-to-date before using this function
  setMoves = () => {
    /// if the tile is not selected yet , this happens exactly after the move
    /// (the tile gets deselected) so we need to set moves to null
    if (
      !this.state.selectedTile ||
      !this.state.selectedTile.file ||
      this.state.historyIndex !== this.gameClient.game.moveHistory.length - 1
    )
      this.setState({ moves: null });
    else {
      let moves = this.state.validMoves.filter(
        (move) =>
          move.src.file === this.state.selectedTile.file &&
          move.src.rank === this.state.selectedTile.rank
      );
      this.setState({ moves: moves[0] && moves[0].squares });
    }
  };

  /// the selected piece is moved to fileTo rankTo position
  moveFunction = (fileTo, rankTo) => {
    let promo = null;

    if (
      this.state.selectedTile.piece.type === "pawn" &&
      (rankTo === 8 || rankTo === 1)
    ) {
      promo = "Q";
    }

    this.gameClient.move(
      `${this.state.selectedTile.file}${this.state.selectedTile.rank}`,
      `${fileTo}${rankTo}`,
      promo
    );

    this.setState(
      {
        board: this.gameClient.game.board,
        validMoves: this.gameClient.getStatus().validMoves,
        selectedTile: null,
      },
      () => {
        this.setMoves();
      }
    );
  };

  /// sets the selected tile and updates the moves that the player can make with the piece
  setSelectedTile = (value) => {
    this.setState({ selectedTile: value }, () => {
      /// we need a callback coz we need selectedTile to be up-to-date when using setMoves
      this.setMoves();
    });
  };
}


export { BoardProvider, BoardContext };
