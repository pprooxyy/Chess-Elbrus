import React from "react";
import "./GameContent.css";

function GameContent({ children }: { children: React.ReactNode }) {
  return <div className="game-page-content-wrapper">{children}</div>;
}
export default GameContent;
