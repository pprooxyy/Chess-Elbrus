import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import StartPage from "./components/pages/StartPage/StartPage";
import MainPage from "./components/pages/MainPage/MainPage";
import FriendPage from "./components/pages/FriendsPage/FriendsPage";
import HistoryPage from "./components/pages/HistoryPage/HistoryPage";
import LeaderboardPage from "./components/pages/LeaderboardPage/LeaderboardPage";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import GamePage from "./components/pages/GamePage/GamePage";
import { io } from "socket.io-client";
import { getUser } from "./redux/thunk/auth/getUser";
import { RootState, useAppDispatch } from "./redux/typesRedux";
import { useSelector } from "react-redux";

const socket: any = io("http://localhost:3002");

function App() {
  const dispatch = useAppDispatch();

  //todo через thunk навбар обращается к серверу и получает юзера,
  //todo который лежит в сессии и кладёт его в стейт
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const loadingAuth = useSelector(
    (state: RootState) => state.authSlicer.isLoading
  );
  // const loadingProfile = useSelector(
  //   (state: RootState) => state.profileSlicer.isLoading
  // );
  // console.log("loadingAuth", loadingAuth);
  // console.log("loadingProfile", loadingProfile);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game" element={<GamePage socket={socket} />} />
      </Routes>
      {loadingAuth ? (
        <h1>LOADING...</h1>
      ) : (
      <Routes>
        <Route path="/home" element={<MainPage />} />
        <Route path="/friends" element={<FriendPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/leaders" element={<LeaderboardPage />} />
      </Routes>
        )}      
    </div>
  );
}

export default App;
