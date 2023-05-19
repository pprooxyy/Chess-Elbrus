import React from "react";

import "./LeaderboardPage.css";
import Navbar from "../../organisms/Navbar/Navbar";
import Leaderboard from "../../organisms/Leaderboard/Leaderboard";

export default function LeaderboardPage() {
  return (
    <div className="leaders-page-wrapper">
      <Navbar />
      <Leaderboard />
    </div>
  );
}
