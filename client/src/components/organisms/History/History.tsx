import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/typesRedux";
import "./History.css";
import { getHistory } from "../../../redux/thunk/history/history"
import { Link } from "react-router-dom";
export default function History() {

const dispatch = useAppDispatch();
//
useEffect(() => {
  dispatch( getHistory() );
}, [])
const history = useAppSelector(state => state.historySlicer.history );
console.log( history, 'in the history component' );

  return (
    <>
      <h1 className="history-title">History</h1>
          {history.map((game) => (
            <div className="history-wrapper" key={game.id}>
              <div className="names-and-date">
                <h3>
                <Link to={`/profile/${game.player1Id}`}>{game.player1}</Link>
                  {' VS '}
                <Link to={`/profile/${game.player2Id}`}>{game.player2}</Link>
                </h3>
                <h3> {game.game_start_time} </h3>
              </div>
              <div className="board-img">
                <img className="board-png" src="./assets/board.png" alt="board" />
              </div>
              <div className="game-status-and-duration">
                <h3>{ game.tie ? ("IT'S A TIE!!!!!!!!!!") : ( <Link to={`/profile/${game.winnerId}`}>{`WINNER: ${game.winner}`}</Link>)}</h3>
                <h3>{`DURATION: ${game.duration}`}</h3>
              </div>
            </div>
          ))}
      </>
          
      
    
  );
}
