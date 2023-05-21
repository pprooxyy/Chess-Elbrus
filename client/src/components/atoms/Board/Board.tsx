import React, { useEffect, useState } from "react";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";
import io from "socket.io-client";
import { useAppDispatch } from "../../../redux/typesRedux";
import { getUser } from "../../../redux/thunk/auth/getUser";

const socket = io("http://localhost:3002");

function Board() {
  const [chess, setChess] = useState(new Chess());
  const [room, setRoom]: any = useState("");
  const [position, setPosition]: any = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );
  const [isPlayersMove, setIsPlayersMove]: any = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("MOOVE", isPlayersMove);
    console.log(chess.fen());

    socket.on("connect", async () => {
      const storageUserId = localStorage.getItem("userId");
      const storageRoomId = localStorage.getItem("roomId");

      if (storageUserId && storageRoomId) {
        console.log("LALA");

        socket.emit(
          "reconnect",
          { storageUserId, storageRoomId },
          (onSuccess: any) => {
            console.log("lala");

            console.log("SUCCES", onSuccess);
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
    });

    socket.on("move", (nextPosition, move) => {
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

    // return () => {
    //   socket.off("room-updated");
    //   socket.off("move");
    // };
  }, [chess, isPlayersMove, position]);

  const handleCreateRoom = async () => {
    try {
      const response = await dispatch(getUser());
      const userFromBack = response.payload;
      const userId = response.payload.user_id;
      socket.emit(
        "create-room",
        userFromBack,
        (currentRoomID: any, firstMoveCheck: any) => {
          console.log(currentRoomID);

          localStorage.setItem("roomId", currentRoomID);
          localStorage.setItem("userId", userId);
          setRoom(currentRoomID);
          setIsPlayersMove(firstMoveCheck);
          // const isFirstMove = createdRoom.player1.color === "w";
          // setIsPlayersMove(isFirstMove);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinRoom = async () => {
    try {
      const response = await dispatch(getUser());
      const userFromBack = response.payload;
      const roomId = prompt("Enter room ID:");
      socket.emit(
        "join-room",
        roomId,
        userFromBack,
        (success: boolean, firstMoveCheck: boolean) => {
          if (success) {
            setRoom(roomId);
            setIsPlayersMove(firstMoveCheck);
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
    console.log("FIRST BOARD WHEN MOVING PIECE", chess.ascii());

    try {
      const response = await dispatch(getUser());
      const userFromBack = response.payload;
      const userFromBackID = userFromBack.user_id;
      if (isPlayersMove) {
        const currentMove = {
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        };
        if (chess.move(currentMove)) {
          setPosition(chess.fen());
          console.log("AFTER MOVE FOR USER THAT MOVED", chess.ascii());

          socket.emit(
            "move",
            userFromBackID,
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
        orientation={"white"}
        width={400}
        darkSquareStyle={{ backgroundColor: "#B7C0D8" }}
        lightSquareStyle={{ backgroundColor: "#E8EDF9" }}
        draggable={isPlayersMove}
        dropOffBoard="snapback"
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
