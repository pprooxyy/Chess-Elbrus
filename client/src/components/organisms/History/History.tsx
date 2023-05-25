import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/typesRedux";
import "./History.css";
import { getHistory } from "../../../redux/thunk/history/history";
import { Link } from "react-router-dom";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";
export default function History() {
  const dispatch = useAppDispatch();
  //
  useEffect(() => {
    dispatch(getHistory());
  }, []);
  const history = useAppSelector((state) => state.historySlicer.history);
  console.log(history, "in the history component");

  return (
    <>
      <h1 className="history-title">History</h1>
      {history.map((game) => (
        <div className="history-wrapper" key={game.id}>
          <div className="names-and-date">
            <p>
              <b>
                <Link to={`/profile/${game.player1Id}`}>{game.player1}</Link>
              </b>
            </p>
            {" VS "}
            <p>
              <b>
                <Link to={`/profile/${game.player2Id}`}>{game.player2}</Link>
              </b>
            </p>
            <br />
            <h3>Game started:</h3>
            <h3>{game.game_start_time} </h3>
          </div>
          <div className="board-container">
            <Chessboard
              position={game.game_fen}
              width={200}
              darkSquareStyle={{ backgroundColor: "#B7C0D8" }}
              lightSquareStyle={{ backgroundColor: "#E8EDF9" }}
              draggable={false}
              dropOffBoard="snapback"
              transitionDuration={10}
            />
          </div>
          {/* <div className="board-img">
                <img className="board-png" src="./assets/board.png" alt="board" />
              </div> */}
          <div className="game-status-and-duration">
            <h3>
              {game.tie ? (
                "IT'S A TIE!"
              ) : (
                <Link
                  to={`/profile/${game.winnerId}`}
                >{`Winner: ${game.winner}`}</Link>
              )}
            </h3>
            <h3>{`Duration: ${game.duration}`}</h3>
          </div>
        </div>
      ))}
    </>
  );
}
