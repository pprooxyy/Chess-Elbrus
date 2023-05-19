import React from "react";
import "./MainPagePuzzles.css";
import Button from "../../atoms/Button/Button";

function MainPuzzles() {
  const boardStyles = {
    width: 400,
    height: 400,
  };

  const hikaruStyles = {
    width: 100,
    height: 100,
  };

  return (
    <div className="main-puzzles-section">
      <div className="puzzle-content-wrapper">
        <div className="text-button-puzzle-wrapper">
          <h1>Solve Chess Puzzle</h1>
          <Button
            text="Solve Puzzle"
            icon="/assets/puzzle.png"
            width="250px"
            height="80px"
            className="solve-puzzle"
          />
          <div className="hikaru-text-wrapper">
            <img style={hikaruStyles} src="assets/hikaru.jpg" alt="" />
            <div className="hikaru-text">
              <h3>
                "Puzzles are the best way to improve pattern recognition, and no
                site does it better."
              </h3>
              <p>Hikaru Nakamura</p>
            </div>
          </div>
        </div>
        <div className="img-puzzle-wrapper">
          <img style={boardStyles} src="assets/board.png" alt="board" />
        </div>
      </div>
    </div>
  );
}

export default MainPuzzles;
