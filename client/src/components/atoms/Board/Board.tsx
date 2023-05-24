import React, { useEffect, useRef, useState } from "react";
import "./Board.css";
import Chessboard from "chessboardjsx";
import { Chess, Square } from "chess.js";
import { useAppDispatch } from "../../../redux/typesRedux";
import { getUser } from "../../../redux/thunk/auth/getUser";

function Board({ socket }: any) {
  const [chess] = useState(new Chess());
  const [room, setRoom] = useState("");
  const [position, setPosition] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );

  const inputRef = useRef<any>(null);
  const [playerColor, setPlayerColor] = useState<"white" | "black">("white");
  const [highlightedSquares, setHighlightedSquares] = useState<string[]>([]);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  const [oponentName, setOponentName] = useState("");
  const [gameStart, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState("none");
  const [gameOverText, setGameOverText] = useState<'win' | 'draw' | 'lose'>('lose');
  const [once, setOnce] = useState(false);

  const dispatch = useAppDispatch();

  function PlayerMove() {
    return gameStart && !chess.isGameOver() && chess.turn() === playerColor.charAt(0)
  }


  useEffect(() => {
    if (once) return;

    function CheckGameOver(chess: Chess, playerColor: string) {
      if (chess.isGameOver()) {
        setGameOver('');

        if (chess.isCheckmate()) {
          setStartGame(false);
          setGameOverText(chess.turn() === playerColor ? 'lose' : 'win');
        } else if (chess.isDraw()) {
          setGameOverText('draw');
        }
      }
    }

    console.log("==========================================");
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
      console.log(`=========== ${chess.isGameOver()}`)
      CheckGameOver(chess, roomObject.playerColor.charAt(0));
      setOponentName(roomObject.oponentName)
      setStartGame(roomObject.gameStart);
    });

    socket.on("move", async (move: any) => {
      console.log("meme");

      console.log(
        "POSITION ON CLIENT 2 BEFORE POS COME FROM BACK",
        chess.ascii()
      );
      console.log("NEXT POSITION CAME TO CLENT 2", move);
      // if(isPlayersMove){
      try {
        if (chess.move(move)) {
          setPosition(chess.fen());
        } else {
          throw new Error('invalid move');
        }
      } catch (error) {
        const response = await dispatch(getUser());
        const userFromBack = response.payload;
        socket.emit("reconnect", userFromBack);
      }
      // }
    });

    socket.on("playerJoin", (player: any) => {
      setOponentName(player.user_name)
    });

    socket.on("playerDisconnect", (player: any) => {
      setOponentName("")
    });

    socket.on("gameStart", () => {
      console.log("game start");
      console.log(chess.turn() === playerColor.charAt(0));
      setStartGame(true);
    });

    socket.on("gameEnd", async (board: any, obj: any) => {
      chess.load(board);
      const response = await dispatch(getUser());
      const userFromBack = response.payload;
      setPosition(chess.fen());
      setGameOver('');
      if (chess.isCheckmate()) {
        setStartGame(false);
        setGameOverText(obj.winner === userFromBack.id ? 'win' : 'lose');
      } else if (chess.isDraw()) {
        setGameOverText('draw');
      }
    });
    // return () => {
    //   socket.off("room-updated");
    //   socket.off("move");
    // };
    setOnce(true);
  }, [chess, dispatch, once, playerColor, socket]);

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
          setGameOver('none');
          setOponentName('');
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
        (success: boolean, board: string, firstMoveCheck: boolean, oponentName: string) => {
          if (success) {
            chess.load(board);
            setPosition(board);
            setRoom(roomId);
            setGameOver('none');
            setOponentName(oponentName)
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
    try {
      const response = await dispatch(getUser());
      const userFromBack = response.payload;
      const userFromBackID = userFromBack.id;
      const currentMove = {
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      };
      socket.emit(
        "move",
        userFromBackID,
        room,
        currentMove,
        (resp: boolean) => {
          if (resp && chess.move(currentMove)) {
            setPosition(chess.fen());
            console.log("AFTER MOVE FOR USER THAT MOVED", chess.ascii());
            console.log("POSSIBLE MOVES", chess.moves());
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handlePieceClick = (square: Square) => {
    if (!PlayerMove()) return;

    const piece = chess.get(square);

    if (piece) {
      setSelectedSquare(square);
      const possibleMoves = chess.moves({ square, verbose: true });
      const highlightedSquares = possibleMoves.map((move) => move.to);
      setHighlightedSquares(highlightedSquares);
    }
  };

  const handleLog = () => {
    console.log(room, position);
  };

  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
    }
  }

  const handleDrag = (square: any) => {
    return PlayerMove() && square.piece.charAt(0) === playerColor.charAt(0)
  }

  return (
    <div className="game-container">
      <div className="board-container">
        <Chessboard
          position={position}
          onDrop={handleMove}
          allowDrag={handleDrag}
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
          draggable={PlayerMove()}
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
        <input ref={inputRef} className="room-id-container" value={room} onClick={handleInputClick} readOnly />
        <div style={{ display: gameOver }} className="room-id-container">
          {gameOverText}
        </div>
        <div style={{ display: gameStart ? '' : 'none' }} className="room-id-container">
          {playerColor}
        </div>
        <div style={{ display: PlayerMove() ? '' : 'none' }} className="room-id-container">
          You turn
        </div>
        <div className="room-id-container">
          You oponent
          <div>
            {oponentName}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
