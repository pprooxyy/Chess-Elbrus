import React, { useState } from "react";
import "./Leaderboard.css";

export default function Leaderboard() {
  const generateRandomData = () => {
    const data = [];
    for (let i = 1; i <= 10; i++) {
      const player = {
        name: `Player ${i}`,
        totalGames: Math.floor(Math.random() * 100),
        win: Math.floor(Math.random() * 50),
        lose: Math.floor(Math.random() * 50),
        draw: Math.floor(Math.random() * 10),
        score: Math.floor(Math.random() * 100),
      };
      data.push(player);
    }
    return data;
  };

  const [playersData] = useState(generateRandomData());

  return (
    <div className="lider-table">
      <table className="top-10-players-table">
        <caption>Top 10 Players</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Games</th>
            <th>Win</th>
            <th>Lose</th>
            <th>Draw</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {playersData.map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
              <td>{player.totalGames}</td>
              <td>{player.win}</td>
              <td>{player.lose}</td>
              <td>{player.draw}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
