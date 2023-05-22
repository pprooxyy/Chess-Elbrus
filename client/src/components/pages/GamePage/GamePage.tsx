import React from "react";
import Navbar from "../../organisms/Navbar/Navbar";
import GameContent from "../../organisms/GameContent/GameContent";
import Board from "../../atoms/Board/Board";
import GameChat from "../../molecules/GameChat/GameChat";

import "./GamePage.css";

function GamePage({ socket }: any) {
  return (
    <>
      <Navbar />
      <GameContent>
        <Board socket={socket} />
        <GameChat socket={socket} />
      </GameContent>
    </>
  );
}

export default GamePage;
