const { v4: uuidv4 } = require("uuid");
const { Chess } = require("chess.js");
const Room = require("../lib/Room.class");
const { User, Game } = require("../../db/models");
const { where } = require("sequelize");

module.exports = (io, rooms = new Map([["", new Room()]])) => {
  io.on("connection", (socket) => {
    socket.on("reconnect", (userData) => {
      if (!userData) return;

      console.log("LOG_DATA_FOR_RECONNECT", userData);
      const roomArray = findRoomByPlayerId(userData.id, rooms);
      console.log("room array", roomArray);
      if (roomArray) {
        const room = roomArray[1];
        const player = room.getPlayerById(userData.id);
        const nextPlayer = room.getNextPlayerById(userData.id);
        console.log(nextPlayer)

        const roomObject = {
          roomId: room.roomId,
          playerColor: player.color,
          playerCanMove: room.isFull() && room.game.turn() === player.color,
          board: room.game.fen(),
          gameStart: room.isFull() && !room.isGameEnd(),
          oponentName: nextPlayer ? nextPlayer.name : ""
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
        socket.broadcast.emit("playerDisconnect");
        if (oldRoom.isEmpty()) {
          rooms.delete(oldRoom[0]);
        }
      }

      const game = new Chess();
      const roomId = uuidv4();
      const room = new Room(roomId, game, null, null);
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

    socket.on("join-room", (roomId, userData, callback) => {
      if (!userData || !userData.id) return;
      const room = rooms.get(roomId);
      if (!room) return callback(false);
      if (room.isFull() || !room.player1) return callback(false);

      const oldRoomArr = findRoomByPlayerId(userData.id, rooms);

      if (oldRoomArr) {
        if (oldRoomArr[0] === roomId) callback(false);

        const oldRoom = rooms.get(oldRoomArr[0]);
        oldRoom.removePlayerById(userData.id);
        socket.broadcast.emit("playerDisconnect");
        if (oldRoom.isEmpty()) {
          rooms.delete(oldRoom[0]);
        }
      }

      const setSecondPlayerColor = room.getSecondPlayerColor();

      const playerParams = [
        userData.id,
        userData.user_name,
        userData.user_rating,
        setSecondPlayerColor,
        false,
        false,
        2,
      ];

      const firstMoveCheck = setSecondPlayerColor === "w" ? true : false;
      room.setPlayer(...playerParams);
      socket.join(roomId);
      // socket.emit("move", room.game.fen());
      const nextPlayer = room.getNextPlayerById(userData.id);

      callback(true, room.game.fen(), firstMoveCheck, nextPlayer ? nextPlayer.name : "");


      socket.broadcast.emit("playerJoin", {
        user_id: playerParams[0],
        user_name: playerParams[1],
        user_rating: playerParams[2],
        oponentName: userData.user_name
      });
      room.startGame();
      io.to(roomId).emit("gameStart");
    });

    socket.on("disconnect", () => {
      socket.disconnect();
    });

    socket.on("move", async (userId, roomId, move, callback) => {
      const room = rooms.get(roomId);
      if (!room || !room.isFull()) return callback(false);
      const player = room.getPlayerById(userId);
      if (!player) return callback(false);

      console.log("ROOM", room);
      console.log("PLAYER", player);
      console.log("POSITION CAME TO SERVER", room.game.ascii());

      socket.join(roomId);
      const canMove = room.makeMove(move);
      callback(canMove);
      if (canMove) {
        if (room.isCheckMate()) {
          const add = await Game.create(room.getDbData())
          room.getWinner();

          addUserScore(room.getWinner(), 25);
          addUserScore(room.getLoser(), -25);

          io.to(roomId).emit("gameEnd", room.game.fen(), {
            winner: room.getWinner(),
            loser: room.getLoser()
          });
        } else {
          socket.broadcast.emit("move", move);
        }
      }
    });
  });
};

async function addUserScore(userId, score) {
  const user = await User.findOne({
    where: { id: userId },
    raw: true
  });

  const user1 = await User.update(
    { user_rating: user.user_rating + score < 0 ? 0 : user.user_rating + score },
    { where: { id: userId } }
  );
}

function isPlayersTurn(player, room) {
  return player && player.isPlayerTurn && room && !room.isCheckMate();
}

function findRoomByPlayerId(playerId, rooms = new Map([["", new Room()]])) {
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
