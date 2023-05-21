const { v4: uuidv4 } = require("uuid");
const { Chess } = require("chess.js");
const Game = require("../lib/Room.class");

module.exports = (io, rooms) => {
  io.on("connect", (socket) => {
    socket.on("reconnect", (previousData, callback) => {
      console.log(previousData);
      const roomArray = findRoomByPlayerId(
        previousData.storageUserId,
        Array.from(rooms)
      );
      console.log("room array", roomArray);
      if (roomArray) {
        const roomObject = { [roomArray[0]]: roomArray[1] };
        console.log("LOG ROOM OBJECT", roomObject);
        // callback(roomObject);
        // if (roomObject) {
        //   socket.emit("move", roomObject.game.fen());
        // }
      }
    });

    socket.on("create-room", (user, callback) => {
      const game = new Chess();
      const roomId = uuidv4();
      const room = new Game(roomId, game, null, null);
      const randomColor = room.randomColor();

      const playerParams = [
        user.user_id,
        user.user_name,
        user.user_rating,
        randomColor,
        false,
        true,
        1,
      ];
      room.setPlayer(...playerParams);
      rooms.set(roomId, room);
      socket.join(roomId);
      // socket.emit("move", room.game.fen());
      const firstMoveCheck = randomColor === "w" ? true : false;
      callback(roomId, firstMoveCheck);
    });

    socket.on("join-room", (roomId, user, callback) => {
      const room = rooms.get(roomId);
      const setSecondPlayerColor = room.setSecondPlayerColor();

      if (!room) return callback(false);
      if (room.isFull()) return callback(false);

      if (room.player2 === null) {
        const playerParams = [
          user.user_id,
          user.user_name,
          user.user_rating,
          setSecondPlayerColor,
          false,
          false,
          2,
        ];

        const firstMoveCheck = setSecondPlayerColor === "w" ? true : false;
        room.setPlayer(...playerParams);
        socket.join(roomId);
        // socket.emit("move", room.game.fen());
        callback(true, firstMoveCheck);
      }
    });

    socket.on(
      "move",
      (user, move, roomId, position, currentMoove, callback) => {
        const room = rooms.get(roomId);
        const player = room.getPlayerById(user.user_id);
        console.log("ROOM", room);
        console.log("PLAYER", player);
        console.log("POSITION CAME TO SERVER", room.game.ascii());

        if (!player || !room) {
          callback(false);
          return;
        }
        socket.join(roomId);
        const nextPosition = room.makeMove(position, move);

        callback(true);
        io.to(roomId).emit("move", nextPosition, move);
      }
    );
  });
};

function isPlayersTurn(player, room) {
  return player && player.isPlayerTurn && room && !room.isCheckMate();
}

function findRoomByPlayerId(playerId, rooms) {
  for (const room of rooms) {
    const player1 = room[1].player1;
    const player2 = room[1].player2;
    if (player1 && player1.id === Number(playerId)) {
      return room;
    }
    if (player2 && player2.id === Number(playerId)) {
      return room;
    }
  }
  return null; // Player not found in any room
}
