import React, { useEffect, useState } from "react";
import { getGamesForLeaders } from "../../../redux/thunk/Leaders/getGamesForLeaders";
import { useAppDispatch, useAppSelector } from "../../../redux/typesRedux";
import "./Leaderboard.css";
import { IStatForLeaders } from "../../../types";
import { Link } from "react-router-dom";

export default function Leaderboard() {
  const dispatch = useAppDispatch();

  const images = [
    "/assets/prize-icons/1st-prize-icon.svg",
    "/assets/prize-icons/2nd-prize-icon.svg",
    "/assets/prize-icons/3rd-prize-icon.svg",
  ];

  useEffect(() => {
    dispatch(getGamesForLeaders());
  }, [dispatch]);

  const games = useAppSelector((state) => state.leaderSlice.games);

  console.log("leaderState: -------->", games);

  return (
    <div className="lider-table">
      <table className="top-10-players-table">
        <caption>Top 10 Players</caption>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Total Games</th>
            <th>Win</th>
            <th>Lose</th>
            <th>Draw</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => (
            <tr key={index}>
              <td>
                {index + 1 === 1 ? (
                  <img
                    src={images[0]}
                    alt={`Prize for ${index + 1}st place`}
                    className="prize-icon"
                  />
                ) : index + 1 === 2 ? (
                  <img
                    src={images[1]}
                    alt={`Prize for ${index + 1}nd place`}
                    className="prize-icon"
                  />
                ) : index + 1 === 3 ? (
                  <img
                    src={images[2]}
                    alt={`Prize for ${index + 1}rd place`}
                    className="prize-icon"
                  />
                ) : (
                  index + 1
                )}
              </td>
              <td>
                <Link to={`/profile/${game.id}`} key={game.id}>
                  {game.user_name}
                </Link>
              </td>
              <td>{game.total}</td>
              <td>{game.wins}</td>
              <td>{game.losses}</td>
              <td>{game.draws}</td>
              <td>{game.user_rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
