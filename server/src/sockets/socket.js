const { v4: uuidv4 } = require("uuid");
const { Chess } = require("chess.js");
const Game = require("../lib/Room.class");

module.exports = (io, rooms) => {
  io.on("connection", (socket) => {
    socket.on("reconnect", (userData, callback) => {
      if (!userData) return;

      console.log("LOG_DATA_FOR_RECONNECT", userData);
      const roomArray = findRoomByPlayerId(userData.id, rooms);
      console.log("room array", roomArray);
      if (roomArray) {
        const room = roomArray[1];
        const player = room.getPlayerById(userData.id);

        const roomObject = {
          roomId: room.roomId,
          playerColor: player.color,
          playerCanMove: room.isFull() && room.game.turn() === player.color,
          board: room.game.fen(),
        };
        console.log("LOG ROOM OBJECT", roomObject);
        socket.join(roomArray[0]);
        socket.emit("reconnect", roomObject);
        // if (roomObject) {
        //   socket.emit("move", roomObject.game.fen());
        // }
      }
    });

    socket.on("create-room", (user, callback) => {
      if (!user) return;
      const oldRoomArr = findRoomByPlayerId(user.id, rooms);
      if (oldRoomArr) {
        const oldRoom = rooms.get(oldRoomArr[0]);
        oldRoom.removePlayerById(user.id);
        if (oldRoom.isEmpty()) {
          rooms.delete(oldRoom[0]);
        }
      }

      const game = new Chess();
      const roomId = uuidv4();
      const room = new Game(roomId, game, null, null);
      const randomColor = room.randomColor();

      const playerParams = [
        user.id,
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
      if (!user || !user.id) return;
      const room = rooms.get(roomId);
      if (!room) return callback(false);
      if (room.isFull()) return callback(false);

      const oldRoomArr = findRoomByPlayerId(user.id, rooms);

      if (oldRoomArr) {
        if (oldRoomArr[0] === roomId) callback(false);

        const oldRoom = rooms.get(oldRoomArr[0]);
        oldRoom.removePlayerById(user.id);
        if (oldRoom.isEmpty()) {
          rooms.delete(oldRoom[0]);
        }
      }

      const setSecondPlayerColor = room.getSecondPlayerColor();

      if (room.player2 === null) {
        const playerParams = [
          user.id,
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
        callback(true, room.game.fen(), firstMoveCheck);
      }
    });

    socket.on("move", (userId, roomId, move, position, callback) => {
      const room = rooms.get(roomId);
      if (!room) return callback(false);
      const player = room.getPlayerById(userId);
      if (!player) return callback(false);

      console.log("ROOM", room);
      console.log("PLAYER", player);
      console.log("POSITION CAME TO SERVER", room.game.ascii());

      socket.join(roomId);
      const nextPosition = room.makeMove(position, move);

      callback(true);
      io.to(roomId).emit("move", nextPosition, move);
    });
  });
};

function isPlayersTurn(player, room) {
  return player && player.isPlayerTurn && room && !room.isCheckMate();
}

function findRoomByPlayerId(playerId, rooms) {
  console.log("ROOOOOMS", rooms);
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
