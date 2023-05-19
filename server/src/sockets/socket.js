const { v4: uuidv4 } = require("uuid");
const { Chess } = require("chess.js");
const Game = require("../lib/Room.class");

module.exports = (io, rooms) => {
  io.on("connect", (socket) => {
    socket.on("create-room", (user, callback) => {
      const game = new Chess();
      const roomId = uuidv4();
      const room = new Game(roomId, game, null, null);
      const playerParams = [
        user.user_id,
        user.user_name,
        user.user_rating,
        room.randomColor(),
        false,
        true,
        1,
      ];
      room.setPlayer(...playerParams);
      rooms.set(roomId, room);
      const currentRoom = rooms.get(roomId);
      socket.join(roomId);
      callback(currentRoom);
    });

    socket.on("join-room", (roomId, user, callback) => {
      const room = rooms.get(roomId);
      if (!rooms.has(roomId)) return callback(false);
      if (room.isFull()) return callback(false);

      if (room.player2 === null) {
        const playerParams = [
          user.user_id,
          user.user_name,
          user.user_rating,
          room.setSecondPlayerColor(),
          false,
          false,
          2,
        ];
        room.setPlayer(...playerParams);
        room.setInitialTurns();
        socket.join(roomId);
        socket.to(roomId).emit(room - updated, room);
        callback(true, room);
      }
    });

    socket.on("move", (user, move, roomId, callback) => {
      const room = rooms.get(roomId);
      const player = room.getPlayerById(user.user_id);
      if (!player || !room || !isPlayersTurn(player, room)) {
        callback(false);
        return;
      }

      const fromSquare = move.from;
      const toSquare = move.to;

      const chessMove = {
        from: fromSquare,
        to: toSquare,
        promotion: q,
      };

      if (room.game.move(chessMove)) {
        room.getPlayerById(user.user_id).isPlayerTurn = false;
        room.getNextPlayer(player).isPlayerTurn = true;
        socket.to(roomId).emit(move, room, chessMove);
        callback(true, room, chessMove);
      } else {
        callback(false);
      }
    });
  });
};

function isPlayersTurn(player, room) {
  return player && player.isPlayerTurn && room && !room.isCheckMate();
}
