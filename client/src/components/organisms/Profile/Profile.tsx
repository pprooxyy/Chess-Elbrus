import React, { useEffect, useState } from "react";
import "./Profile.css";
import Button from "../../atoms/Button/Button";
import { RootState } from "../../../redux/store";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../redux/typesRedux";
import { getUserGames } from "../../../redux/thunk/profile/getUserGames";
import EditNameForm from "../../atoms/EditNameForm/EditNameForm";
import EditAvatarModal from "../../molecules/EditAvatarModal/EditAvatarModal";
import {
  delFriend,
  setProfileOwner,
} from "../../../redux/slicers/profile.slicer";
import { Link } from "react-router-dom";

export default function MainProfilePage() {
  const { id } = useParams();
  const profileOwnerId = Number(id);

  //todo пользователь из стейта (тот, кто залогинен)
  const user = useAppSelector((state: RootState) => state.authSlicer.user);

  const dispatch = useAppDispatch();

  //todo достаём с сервера статистику игр юзера (хозяина профиля) + самого хозяина
  useEffect(() => {
    dispatch(getUserGames(profileOwnerId));
  }, [dispatch, profileOwnerId]);

  //todo достаём из стейта profileSlicer хозяина профила (profileOwner)
  const profileOwner = useAppSelector(
    (state: RootState) => state.profileSlicer.profileOwner
  );
  console.log("profileOwner из профиля польз: ", profileOwner);

  //todo тут массив объектов всех игр юзера
  const userGames = useAppSelector(
    (state: RootState) => state.profileSlicer.userGames
  );

  //todo объект со статистикой игр юзера
  const userStats = useAppSelector(
    (state: RootState) => state.profileSlicer.userStats
  );

  //todo массив объектов с инфой о друзьях юзера
  const userFriends = useAppSelector(
    (state: RootState) => state.profileSlicer.userFriends
  );

  //todo редактирование имени пользователя

  const [editName, setEditName] = useState(false) as [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ];

  //todo редактирование аватара пользователя (выбор из предложенных)

  const [editPic, setEditPic] = useState(false) as [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ];

  //todo обновление стейта profileOwner, если обновился user (при редактировании)
  useEffect(() => {
    if (user.id === profileOwner.id) {
      dispatch(setProfileOwner(user));
    }
  }, [user, profileOwner]);

  //todo хендлер удаления друга (потом мб будет перенесен в санк)
  const delFriendHandler = async (friendId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3001/friends/${friendId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        dispatch(delFriend(friendId));
      } else {
        console.error("Failed to delete friend:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to delete friend:", error);
    }
  };

  return (
    <>
      <h1>Profile Page</h1>
      <div className="main-profile-container">
        <div className="info-container">
          <div className="profileContainer">
            <div className="profileSubDiv">
              <div className="img-wrapper">
                <img
                  id="profileImage"
                  src={profileOwner.user_avatar}
                  alt="avatar"
                />
                {user.id === profileOwner.id ? (
                  <button
                    className="btn-edit-user"
                    onClick={() => setEditPic(true)}
                  >
                    <img
                      alt="1111"
                      src="/assets/profilePage/photo-edit-icon.svg"
                    />
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="profileSubDiv">
              <div className="profileChangeName">
                {editName ? (
                  <EditNameForm setEditName={setEditName} />
                ) : (
                  <>
                    <h2 id="user-name">
                      {profileOwner.user_name}
                      {user.id === profileOwner.id ? (
                        <button
                          className="btn-edit-user"
                          onClick={() => setEditName(true)}
                        >
                          <img
                            alt="editName"
                            src="/assets/profilePage/pencil-icon.svg"
                            style={{ scale: "0.6" }}
                          />
                        </button>
                      ) : (
                        ""
                      )}
                    </h2>
                  </>
                )}
              </div>

              <p id="user-rating">Rating: {profileOwner.user_rating}</p>
              <div className="statsDiv">
                <p>
                  <b>Statistics:</b>
                </p>
                <p>Total games: {userStats.total}</p>
                <p>Wins: {userStats.wins}</p>
                <p>Losses: {userStats.losses}</p>
                <p>Draws: {userStats.draws}</p>
                <p>Total time: {userStats.totalDuration} min</p>
              </div>
            </div>
          </div>
          <div className="games-history">
            <h2>Games history:</h2>
            {userGames.map((game) => (
              <li className="history-item" key={game.id}>
                <p>
                  {game.winner === game.player1 && (
                    <img
                      src="/assets/profilePage/quality-badge-star-icon.svg"
                      alt="win"
                      style={{ width: "25px" }}
                    />
                  )}
                  <b>{game.player1}</b>{" "}
                  <img
                    src="/assets/profilePage/versus-vs-icon.svg"
                    alt="vs"
                    style={{ width: "25px" }}
                  />{" "}
                  {game.winner === game.player2 && (
                    <img
                      src="/assets/profilePage/quality-badge-star-icon.svg"
                      alt="win"
                      style={{ width: "25px" }}
                    />
                  )}
                  <b>{game.player2}</b>
                </p>
                {game.tie ? (
                  <p>
                    <img
                      src="/assets/profilePage/hand-shake-icon.svg"
                      alt="tie"
                      style={{ width: "25px" }}
                    />
                    TIE
                  </p>
                ) : (
                  ""
                )}
                <p>
                  <img
                    src="/assets/profilePage/history-icon.svg"
                    alt="duration"
                    style={{ width: "25px" }}
                  />{" "}
                  {game.duration} min
                </p>
                <p>
                  <img
                    src="/assets/profilePage/calendar-line-icon.svg"
                    alt="duration"
                    style={{ width: "25px" }}
                  />{" "}
                  {game.game_start_time.slice(0, -3)}
                </p>
              </li>
            ))}
          </div>
        </div>
        <div className="friends-container">
          <h2>Friends:</h2>
          {userFriends.map((friend) => (
            <li className="friends-item">
              <Link
                to={`/profile/${friend.id}`}
                key={friend.id}
                className="friends-link"
              >
                <img
                  src={friend.user_avatar}
                  alt="avatar"
                  className="img-in-list"
                />
                <div className="friend-info">
                  <p>
                    <b>{friend.user_name}</b>
                  </p>
                  <p>Rating: {friend.user_rating}</p>
                </div>
              </Link>
              <button
                className="btn-edit-user"
                style={{ margin: "7px 0px 0px 0px" }}
                onClick={() => delFriendHandler(friend.id)}
              >
                <img alt="cancel" src="/assets/profilePage/cancel-icon.svg" />
              </button>
            </li>
          ))}
        </div>
      </div>

      {editPic && <EditAvatarModal setEditPic={setEditPic} />}
    </>
  );
}
