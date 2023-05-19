import React from "react";
import { Route, Routes } from "react-router-dom";

import StartPage from "./components/pages/StartPage/StartPage";
import MainPage from "./components/pages/MainPage/MainPage";
import FriendPage from "./components/pages/FriendsPage/FriendsPage";
import Profile from "./components/organisms/Profile/Profile";
import HistoryPage from "./components/pages/HistoryPage/HistoryPage";
import LeaderboardPage from "./components/pages/LeaderboardPage/LeaderboardPage";
import Board from "./components/atoms/Board/Board";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/friends" element={<FriendPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/leaders" element={<LeaderboardPage />} />
        <Route path="/game" element={<Board />} />
      </Routes>
    </div>
  );
}

export default App;
