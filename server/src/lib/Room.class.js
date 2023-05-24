
const { Chess } = require("chess.js");

class Game {
  constructor(roomId, game = new Chess(), player1, player2) {
    this.roomId = roomId;
    this.player1 = player1;
    this.player2 = player2;
    this.game = game;
  }

  randomColor() {
    const random = Math.random();
    return random > 0.5 ? "w" : "b";
  }

  getSecondPlayerColor() {
    return this.player1.color === "w" ? "b" : "w";
  }

  isGameEnd() {
    return this.game.isGameOver() || this.game.isCheckmate() || this.game.isDraw()
  }

  isPlayerTurn(player) {
    return player && this.isGameEnd() && player.color === this.game.turn()
  }

  setTurns() {
    this.player1.isPlayerTurn = this.isPlayerTurn(this.player1);
    this.player2.isPlayerTurn = this.isPlayerTurn(this.player2);
  }

  setPlayer(id, name, rating, color, isBot, isHost, wichPlayer) {
    let player = {
      id,
      name,
      rating,
      color,
      isBot,
      isHost,
      isPlayerTurn: null,
    }

    wichPlayer === 1
      ? (this.player1 = player)
      : (this.player2 = player);
  }

  log() {
    // console.log(this.game);
    console.log(this.game.moves());
  }

  makeMove(currentPosition, nextMove) {
    console.log("FIRST BOARD POSITION ON SERVER", this.game.ascii());
    console.log("POSSIBLE MOVES", this.game.moves());
    console.log(currentPosition);
    console.log(this.game.fen());
    if (currentPosition === this.game.fen()) {
      // this.game.load(currentPosition);
      this.game.move(nextMove);
      console.log("FEN OF GAME AFTER MOVE", this.game.fen());
      console.log("POSITION AFTER MOVE", this.game.ascii());
      console.log("POSSIBLE MOVES", this.game.moves());
      console.log("NEXT MOVE", nextMove);
      return this.game.fen();
    }
  }

  getNextPlayer(player) {
    return player.id === this.player1.id ? this.player2 : this.player1;
  }

  isFull() {
    return this.player1 !== null && this.player2 !== null;
  }

  isEmpty() {
    return this.player1 === null && this.player2 === null;
  }

  removePlayerById(id) {
    if (this.player1 && this.player1.id === id) {
      if (this.player2) {
        this.player1 = this.player2;
        this.player2.isHost = true;
        this.player2 = null;
      } else {
        this.player1 = null;
      }
    } else if (this.player2 && this.player2.id === id) {
      this.player2 = null
    }
  }

  getPlayerById(id) {
    return this.player1.id === id ? this.player1 : this.player2;
  }

  isCheckMate() {
    return this.game.isCheck() && this.game.moves().length === 0;
  }
}

module.exports = Room;
