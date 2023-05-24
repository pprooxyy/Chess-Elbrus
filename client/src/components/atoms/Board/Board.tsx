import React, { useEffect, useState } from "react";
import "./Board.css";
import Chessboard from "chessboardjsx";
import { Chess, Square } from "chess.js";
import { useAppDispatch } from "../../../redux/typesRedux";
import { getUser } from "../../../redux/thunk/auth/getUser";

function Board({ socket }: any) {
  const [chess, setChess] = useState(new Chess());
  const [room, setRoom] = useState("");
  const [position, setPosition] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );

  const [isPlayersMove, setIsPlayersMove] = useState(true);
  const [playerColor, setPlayerColor] = useState<"white" | "black">("white");
  const [highlightedSquares, setHighlightedSquares] = useState<string[]>([]);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("==========================================");
    console.log("MOOVE", isPlayersMove);
    console.log(chess);

    socket.on("connect", async () => {
      const response = await dispatch(getUser());
      const userFromBack = response.payload;
      socket.emit("reconnect", userFromBack);
    });

    socket.on("reconnect", (roomObject: any) => {
      console.log(roomObject);

      console.log("ROOM OBJECT", roomObject);
      chess.load(roomObject.board);
      console.log("CHESS AFTER SETCHES", chess);
      setPosition(roomObject.board);

      setRoom(roomObject.roomId);
      setPlayerColor(roomObject.playerColor === "w" ? "white" : "black");
      setIsPlayersMove(roomObject.playerCanMove);
    });

    socket.on("move", (nextPosition: any, move: any) => {
      console.log("meme");

      console.log(
        "POSITION ON CLIENT 2 BEFORE POS COME FROM BACK",
        chess.ascii()
      );
      console.log("NEXT POSITION CAME TO CLENT 2", nextPosition);
      // if(isPlayersMove){
      if (nextPosition !== "invalid move") {
        chess.load(nextPosition);
        console.log("POSITION AFTER LOAD CLIENT 2", chess.ascii());
        setPosition(nextPosition);
        setIsPlayersMove(!isPlayersMove);
      } else {
        console.log("invalid move");
      }
      // }
    });
    // return () => {
    //   socket.off("room-updated");
    //   socket.off("move");
    // };
  }, [chess, dispatch, isPlayersMove, socket]);

  const handleCreateRoom = async () => {
    try {
      const response = await dispatch(getUser());
      const userFromBack = response.payload;
      socket.emit(
        "create-room",
        userFromBack,
        (currentRoomID: string, firstMoveCheck: boolean) => {
          console.log(currentRoomID);
          firstMoveCheck ? setPlayerColor("white") : setPlayerColor("black");

          chess.reset();
          setPosition(chess.fen());
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
      const roomId: any = prompt("Enter room ID:");
      socket.emit(
        "join-room",
        roomId,
        userFromBack,
        (success: boolean, board: string, firstMoveCheck: boolean) => {
          if (success) {
            chess.load(board);
            setPosition(board);
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
    setHighlightedSquares([]);
    setSelectedSquare(null);
    console.log("SOURCE SQUARE", sourceSquare);
    console.log("TARGET SQUARE", targetSquare);

    console.log("FIRST BOARD WHEN MOVING PIECE", chess.ascii());
    console.log("POSSIBLE MOVES", chess.moves());
    if (isPlayersMove) {
      try {
        const response = await dispatch(getUser());
        const userFromBack = response.payload;
        const userFromBackID = userFromBack.id;
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
            userFromBackID,
            room,
            currentMove,
            position,
            (resp: boolean) => {
              resp
                ? console.log("move is made")
                : console.log("something wrong");
            }
          );
          setIsPlayersMove(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePieceClick = (square: Square) => {
    const piece = chess.get(square);
    if (piece) {
      setSelectedSquare(square);
      const possibleMoves = chess.moves({ square, verbose: true });
      const highlightedSquares = possibleMoves.map((move) => move.to);
      setHighlightedSquares(highlightedSquares);
    }
  };

  const handleLog = () => {
    console.log(room, position, isPlayersMove);
  };

  return (
    <div className="game-container">
      <div className="board-container">
        <Chessboard
          position={position}
          onDrop={handleMove}
          // allowDrag={function (obj) {
          //   setHighlightedSquares(chess.moves({ square: obj.sourceSquare }));
          //   return true;
          // }}
          onSquareClick={handlePieceClick}
          squareStyles={{
            ...(selectedSquare && {
              [selectedSquare]: { backgroundColor: "#7b61ff" },
            }),
            ...highlightedSquares.reduce(
              (obj, square) => ({
                ...obj,
                [square]: { backgroundColor: "#7b61ff", opacity: "0.5" },
              }),
              {}
            ),
          }}
          orientation={playerColor}
          width={600}
          darkSquareStyle={{ backgroundColor: "#B7C0D8" }}
          lightSquareStyle={{ backgroundColor: "#E8EDF9" }}
          draggable={isPlayersMove}
          dropOffBoard="snapback"
          transitionDuration={10}
        />
      </div>
      <div>
        <div className="game-button-container">
          <button onClick={handleCreateRoom} style={{ marginLeft: "10px" }}>
            Create Room
          </button>
          <button onClick={handleJoinRoom} style={{ marginLeft: "30px" }}>
            Join Room
          </button>
        </div>
        {/* <button onClick={handleLog}>LOG</button> */}
        <input className="room-id-container" value={room} readOnly />
      </div>
    </div>
  );
}

export default Board;
