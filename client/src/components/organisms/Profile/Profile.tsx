import React, { useEffect } from "react";
import "./Profile.css";
import Button from "../../atoms/Button/Button";
import { RootState } from "../../../redux/store";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../redux/typesRedux";
import { getUserGames } from "../../../redux/thunk/profile/getUserGames";

export default function MainProfilePage() {
  const borderSize = { width: 50, height: 50 }; //! what is it, Dima?

  const { id } = useParams();
  // console.log("id: ", id);
  const userId = Number(id);
  // console.log("profileId: ", userId);
  const user = useAppSelector((state: RootState) => state.authSlicer.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserGames(userId));
  }, []);

  const userGames = useAppSelector(
    (state: RootState) => state.profileSlicer.userGames
  );
  const userStats = useAppSelector(
    (state: RootState) => state.profileSlicer.userStats
  );
  // console.log(">>>", userGames);
  // console.log(">>>", userStats);

  return (
    <>
      <div className="main-profile-container">
        <h1>Profile Page</h1>
        <div className="profileContainer">
          <div className="profileSubDiv">
            <img
              id="profileImage"
              src={user.user_avatar}
              alt="avatar"
              style={{ width: "150px" }}
            />
            <Button text="Change Avatar" height="50px" />
          </div>
          <div className="profileSubDiv">
            <div className="profileChangeName">
              <h2>{user.user_name}</h2>

              <button className="btn-pencil">
                <img alt="1111" src="/assets/profilePage/pencil.svg" />
              </button>
            </div>
            {/* <Button
              text="Play Online"
              p="Play with someone from Elbrus"
              icon="/assets/browser.png"
              width="250px"
              height="100px"
              className="play-online"
            />
            <Button
              text="Play with Bot"
              p="Play with the smartes AI"
              icon="/assets/browser.png"
              width="250px"
              height="100px"
              className="play-online"
            /> */}
            <p>Rating: {user.user_rating}</p>
            <p>Total games: {userStats.total}</p>
            <p>Wins: {userStats.wins}</p>
            <p>Losses: {userStats.losses}</p>
            <p>Draws: {userStats.draws}</p>
            <p>Total time: {userStats.totalDuration}</p>
          </div>
        </div>
      </div>
      <div className="buttonHistory">
        <Button
          text="History of the last games"
          icon="/assets/browser.png"
          width="360px"
          height="100px"
          className="play-online"
        />
      </div>
    </>
  );
}
