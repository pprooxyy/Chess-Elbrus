import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";
import io from "socket.io-client";

const socket = io("http://localhost:3002");

function Board() {
  const [chess] = useState(new Chess()); // для проверки логики игры
  const [position, setPosition] = useState("start"); // для обновления позиции на доске
  // const [invitationLink, setInvitationLink] = useState("");
  const [room, setRoom] = useState(""); // New state for room
  const [player, setPlayer] = useState("");

  // const [currentTurn, setCurrentTurn] = useState("white");

  useEffect(() => {
    // socket.on("invitationLink", (link) => {
    //   setInvitationLink(link);
    // });
    socket.on("move", (move) => {
      handleMove(move);
    });
  }, []);

  const handleMove = ({ sourceSquare, targetSquare }: any) => {
    console.log("Move attempt:", { sourceSquare, targetSquare });

    // if (chess.turn() !== currentTurn) {
    //   console.log("Not your turn");
    //   return;
    // }

    try {
      const move = chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      if (move === null) {
        console.log("Invalid move");
        setPosition(sourceSquare);
        return;
      }

      setPosition(chess.fen());

      const isCheckmate = chess.isCheck() && chess.moves().length === 0;
      if (isCheckmate) {
        console.log("Checkmate!");
      }

      console.log("Valid move");
      console.log("Updated board:", chess.ascii());

      // Emit the move to the opponent
      socket.emit(
        "move",
        { sourceSquare, targetSquare },
        player,
        (playerFromBack: any) => {
          console.log("AAAAAAAAAAAAAAA", playerFromBack);

          setPlayer(playerFromBack);
          // setCurrentTurn(currentTurn === "white" ? "black" : "white");
        }
      );
      console.log(player);
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  const handleInitiateGame = () => {
    // Request the server to generate an invitation link
    socket.emit("generateInvitationLink");
  };

  const handleCreateRoom = () => {
    // Request the server to create a new room
    socket.emit("createRoom", (roomId: any, playerId: any) => {
      setRoom(roomId);
      setPlayer(playerId);
    });
  };

  const handleJoinRoom = () => {
    // Request the server to join an existing room
    const roomId: any = prompt("Enter room ID:");
    socket.emit("joinRoom", roomId, (success: any) => {
      if (success) {
        setRoom(roomId);
      } else {
        alert("Failed to join the room.");
      }
    });
  };

  return (
    <div>
      <Chessboard
        id="stockfish"
        position={position}
        onDrop={handleMove}
        orientation="white"
        width={400}
        darkSquareStyle={{ backgroundColor: "#B7C0D8" }}
        lightSquareStyle={{ backgroundColor: "#E8EDF9" }}
        draggable={true}
        dropOffBoard="snapback"
      />
      <div>
        <button onClick={handleCreateRoom}>Create Room</button>{" "}
        {/* New button for creating a room */}
        <button onClick={handleJoinRoom}>Join Room</button>{" "}
        {/* New button for joining a room */}
        <input value={room} readOnly /> {/* Display the room ID */}
      </div>
    </div>
  );
}

export default Board;
