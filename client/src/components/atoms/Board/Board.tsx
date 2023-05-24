import React, { useEffect, useState } from "react";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";
import { useAppDispatch, useAppSelector } from "../../../redux/typesRedux";
import { getUser } from "../../../redux/thunk/auth/getUser";

function Board({ socket }: any) {
  const [chess, setChess] = useState(new Chess());
  const [room, setRoom]: any = useState("");
  const [position, setPosition]: any = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );
  const [isPlayersMove, setIsPlayersMove]: any = useState(false);
  const [playerColor, setPlayerColor]: any = useState("white");

  const dispatch = useAppDispatch();
  const user: any = useAppSelector((state) => state.authSlicer.user);

  useEffect(() => {
    // Dispatch the getUser thunk only if the user data is empty
    if (!user.id) {
      dispatch(getUser());
    }
  }, [user]);

  useEffect(() => {
    console.log(chess);
    socket.on("connect", async () => {
      const userId = user.id;
      const storageRoomId = localStorage.getItem("roomId");
      console.log("storageRoomId", storageRoomId);

      if (userId && storageRoomId) {
        console.log("LALA");

        socket.emit(
          "reconnect",
          { userId, storageRoomId },
          (onSuccess: any) => {
            console.log("lala");

            console.log("SUCCES", onSuccess);
            console.log(onSuccess.storageRoomId);
            console.log(onSuccess.userId);

            // setRoom(onSuccess[1]);
            // chess.load(onSuccess.fen);
            // setPlayerColor(onSuccess.color === "w" ? "white" : "black");
            // setOrientation(onSuccess.color === "w" ? "white" : "black");
            // setPosition(chess.fen());
            // setPlayerMove(chess.turn() === onSuccess.color);
            // setRoom(roomId);
          }
        );
      }

      socket.on("reconnect", (roomObject: any) => {
        console.log("roomObject", roomObject);

        // const room = roomObject[Object.keys(roomObject)[0]];
        const currecntRoom = localStorage.getItem("room");
        console.log(room);

        setRoom(currecntRoom);
        setChess(room.game);
        setPlayerColor(
          room.getPlayerById(user.id).color === "w" ? "white" : "black"
        );
        setPosition(room.game.fen());
        setIsPlayersMove(room.getPlayerById(user.id).isCurrentPlayer());
      });
    });

    // socket.on("reconnect", (roomObject: any) => {
    //   const storageRoomId: any = localStorage.getItem("roomId");
    //   console.log(roomObject);
    //   console.log(storageRoomId);

    //   setChess(roomObject[storageRoomId]);
    //   console.log("CHESS AFTER SETCHES", chess);

    //   // setPosition(chess.fen());
    //   console.log("ROOM OBJECT", roomObject);
    // });

    //TODO reconnect logic
    //TODO fix chat bug
    //TODO main page styles //!done
    //TODO chess on mate
    //TODO mooves history

    socket.on("move", (nextPosition: any, move: any) => {
      console.log("meme");

      console.log(
        "POSITION ON CLIENT 2 BEFORE POS COME FROM BACK",
        chess.ascii()
      );
      console.log("NEXT POSITION CAME TO CLENT 2", nextPosition);

      if (nextPosition !== "invalid move") {
        chess.load(nextPosition);
        console.log("POSITION AFTER LOAD CLIENT 2", chess.ascii());
        setPosition(chess.fen());
        setIsPlayersMove(!isPlayersMove);
      } else {
        console.log("invalid move");
      }
    });

    return () => {
      socket.off("reconnect");
      socket.off("move");
    };
  }, [user, isPlayersMove, chess, socket, room]);

  const handleCreateRoom = async () => {
    try {
      const userFromBack = user;
      // const userName = user.user_name;
      // const userId = user.id;

      socket.emit(
        "create-room",
        userFromBack,
        (currentRoomID: any, firstMoveCheck: any, room: any) => {
          console.log(currentRoomID);
          firstMoveCheck ? setPlayerColor("white") : setPlayerColor("black");

          setRoom(currentRoomID);
          setIsPlayersMove(firstMoveCheck);
          localStorage.setItem("roomId", currentRoomID);
          localStorage.setItem("room", room);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinRoom = async () => {
    try {
      const userFromBack = user;
      // const userName = user.user_name;
      // const userId: any = user.id;
      const roomId: any = prompt("Enter room ID:");
      socket.emit(
        "join-room",
        roomId,
        userFromBack,
        (success: boolean, firstMoveCheck: boolean, room: any) => {
          if (success) {
            setRoom(roomId);
            setIsPlayersMove(firstMoveCheck);
            firstMoveCheck ? setPlayerColor("white") : setPlayerColor("black");
          } else {
            alert("Failed to join the room");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleMove = async ({ sourceSquare, targetSquare }: any) => {
    console.log("SOURCE SQUARE", sourceSquare);
    console.log("TARGET SQUARE", targetSquare);

    console.log("FIRST BOARD WHEN MOVING PIECE", chess.ascii());
    console.log("POSSIBLE MOVES", chess.moves());

    try {
      const userFromBack = user;
      // const userName = user.user_name;
      // const userId: any = user.id;
      if (isPlayersMove) {
        const currentMove = {
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        };
        if (chess.move(currentMove)) {
          setPosition(chess.fen());
          console.log("AFTER MOVE FOR USER THAT MOVED", chess.ascii());
          console.log("POSSIBLE MOVES", chess.moves());

          socket.emit(
            "move",
            userFromBack,
            currentMove,
            room,
            position,
            currentMove,
            (resp: boolean) => {
              resp
                ? console.log("move is made")
                : console.log("something wrong");
            }
          );
        }
      } else {
        alert("not valid move");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const handleMove = async ({ sourceSquare, targetSquare }: any) => {
  //   try {
  //     const response = await dispatch(getUser());
  //     const userFromBack = response.payload;
  //     const userFromBackID = userFromBack.user_id;
  //     if (isPlayersMove) {
  //       const currentMove = {
  //         from: sourceSquare,
  //         to: targetSquare,
  //         promotion: "q",
  //       };

  //       socket.emit(
  //         "move",
  //         userFromBackID,
  //         currentMove,
  //         room,
  //         position,
  //         (resp: boolean) => {
  //           resp ? console.log("move is made") : console.log("something wrong");
  //         }
  //       );
  //     } else {
  //       alert("not tour turn");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleLog = () => {
    console.log(room, position, isPlayersMove);
  };

  return (
    <div>
      <Chessboard
        position={position}
        onDrop={handleMove}
        orientation={playerColor}
        width={600}
        darkSquareStyle={{ backgroundColor: "#B7C0D8" }}
        lightSquareStyle={{ backgroundColor: "#E8EDF9" }}
        draggable={isPlayersMove}
        dropOffBoard="snapback"
        transitionDuration={10}
      />
      <div>
        <button onClick={handleCreateRoom}>Create Room</button>
        <button onClick={handleJoinRoom}>Join Room</button>
        <button onClick={handleLog}>LOG</button>
        <input value={room} readOnly />
      </div>
    </div>
  );
}

export default Board;
