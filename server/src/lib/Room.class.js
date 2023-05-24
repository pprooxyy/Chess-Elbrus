class Room {
  constructor(game, player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.game = game;
  }

  randomColor() {
    const random = Math.random();
    return random > 0.5 ? "w" : "b";
  }

  setSecondPlayerColor() {
    return this.player1.color === "w" ? "b" : "w";
  }

  setInitialTurns() {
    if (this.player1.color === "w") {
      this.player1.isPlayerTurn = true;
      this.player2.isPlayerTurn = false;
    } else if (this.player1.color === "b") {
      this.player1.isPlayerTurn = false;
      this.player2.isPlayerTurn = true;
    } else return "error";
  }

  setPlayer(id, name, rating, color, isBot, isHost, wichPlayer) {
    wichPlayer === 1
      ? (this.player1 = {
          id,
          name,
          rating,
          color,
          isBot,
          isHost,
          isPlayerTurn: null,
        })
      : (this.player2 = {
          id,
          name,
          rating,
          color,
          isBot,
          isHost,
          isPlayerTurn: null,
        });
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

  getPlayerById(id) {
    return this.player1.id === id ? this.player1 : this.player2;
  }

  isCheckMate() {
    return this.game.isCheck() && this.game.moves().length === 0;
  }
}

module.exports = Room;
