import React, { useEffect, useState } from "react";
import "./Profile.css";
import Button from "../../atoms/Button/Button";
import { RootState } from "../../../redux/store";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../redux/typesRedux";
import { getUserGames } from "../../../redux/thunk/profile/getUserGames";
import EditNameForm from "../../atoms/EditNameForm/EditNameForm";
import EditAvatarModal from "../../molecules/EditAvatarModal/EditAvatarModal";
import { setProfileOwner } from "../../../redux/slicers/profile.slicer";

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

  //todo тут массив объектов всех игр юзера (пока не используется)
  const userGames = useAppSelector(
    (state: RootState) => state.profileSlicer.userGames
  );

  //todo объект со статистикой игр юзера
  const userStats = useAppSelector(
    (state: RootState) => state.profileSlicer.userStats
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
  if (user.id === profileOwner.id) {
    dispatch(setProfileOwner(user));
  }

  return (
    <>
      <div className="main-profile-container">
        <h1>Profile Page</h1>
        <div className="profileContainer">
          <div className="profileSubDiv">
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
                <img alt="1111" src="/assets/profilePage/photo-edit-icon.svg" />
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="profileSubDiv">
            <div className="profileChangeName">
              {editName ? (
                <EditNameForm setEditName={setEditName} />
              ) : (
                <>
                  <h2 id="user-name">
                    {user.user_name}
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
                <b>Game statistics:</b>
              </p>
              <p>Total games: {userStats.total}</p>
              <p>Wins: {userStats.wins}</p>
              <p>Losses: {userStats.losses}</p>
              <p>Draws: {userStats.draws}</p>
              <p>Total time: {userStats.totalDuration} min</p>
            </div>
          </div>
        </div>
      </div>
      <div className="buttonHistory">
        {/* <Button
          text="History of the last games"
          icon="/assets/browser.png"
          width="360px"
          height="100px"
          className="play-online"
        /> */}
      </div>
      {editPic && <EditAvatarModal setEditPic={setEditPic} />}
    </>
  );
}
