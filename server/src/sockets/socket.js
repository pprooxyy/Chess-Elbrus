const { v4: uuidv4 } = require("uuid");
const { Chess } = require("chess.js");
const Room = require("../lib/Room.class");

module.exports = (io, redis) => {
  redis.connect((err) => {
    if (err) {
      console.log("Failed to connect to Redis", err);
      return;
    }
    console.log("Connected to Redis");
  });

  io.on("connect", (socket) => {
    // socket.on("reconnect", (previousData, callback) => {
    // console.log("LOG_DATA_FOR_RECONNECT", previousData);
    // console.log(redis);
    // redis.get(previousData.roomId, (err, result) => {
    //   if (err) throw err;
    //   const room = JSON.parse(result);
    //   console.log(room);
    // });
    // });

    socket.on("create-room", (user, callback) => {
      const game = new Chess();
      const roomId = uuidv4();
      const room = new Room(game, null, null);
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
      redis.set(roomId, JSON.stringify(room));
      socket.join(roomId);
      const firstMoveCheck = randomColor === "w" ? true : false;
      callback(roomId, firstMoveCheck, room);
    });

    socket.on("join-room", (roomId, user, callback) => {
      redis.get(roomId, (err, result) => {
        if (err) throw err;
        const room = JSON.parse(result);
        console.log("ROOM WHEN JOIN", room);
        if (!room) return callback(false);
        if (room.isFull()) return callback(false);

        if (room.player2 === null) {
          const playerParams = [
            user.id,
            user.user_name,
            user.user_rating,
            room.setSecondPlayerColor(),
            false,
            false,
            2,
          ];

          const firstMoveCheck = room.player2.color === "w" ? true : false;
          room.setPlayer(...playerParams);
          redis.set(roomId, JSON.stringify(room));
          socket.join(roomId);
          callback(true, firstMoveCheck, room);
        }
      });
    });

    socket.on("move", (user, move, roomId, position, currentMove, callback) => {
      redis.get(roomId, (err, result) => {
        if (err) throw err;
        const room = JSON.parse(result);
        const player = room.getPlayerById(user.id);

        if (!player || !room) {
          callback(false);
          return;
        }
        socket.join(roomId);
        const nextPosition = room.makeMove(position, move);

        redis.set(roomId, JSON.stringify(room));
        callback(true);
        io.to(roomId).emit("move", nextPosition, move);
      });
    });
  });
};

function findRoomByPlayerId(playerId, rooms) {
  console.log("ROOOOOOOOMS", rooms);
  for (const room of rooms) {
    console.log("ROOOOOMS", rooms);
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
