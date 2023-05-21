import React from "react";
import "./EditAvatarModal.css";
import { useAppDispatch } from "../../../redux/typesRedux";
import { editUser } from "../../../redux/thunk/auth/editUser";

type EditAvatarModalProps = {
  setEditPic: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditAvatarModal({ setEditPic }: EditAvatarModalProps) {
  const dispatch = useAppDispatch();

  const changeAvatarHandler = (photoId: string) => {
    dispatch(
      editUser({ newName: "", newPic: `/assets/avatars/${photoId}.png` })
    );
    setEditPic(false);
  };

  return (
    <div className="modal-overlay-avatar">
      <div className="modal-avatar">
        <button
          className="profile-btn-change-avatar"
          onClick={() => changeAvatarHandler("1")}
        >
          <img
            className="profile-btn-img"
            src="/assets/avatars/1.png"
            alt="1"
          />
        </button>
        <button
          className="profile-btn-change-avatar"
          onClick={() => changeAvatarHandler("2")}
        >
          <img
            className="profile-btn-img"
            src="/assets/avatars/2.png"
            alt="1"
          />
        </button>
        <button
          className="profile-btn-change-avatar"
          onClick={() => changeAvatarHandler("3")}
        >
          <img
            className="profile-btn-img"
            src="/assets/avatars/3.png"
            alt="1"
          />
        </button>
        <button
          className="profile-btn-change-avatar"
          onClick={() => changeAvatarHandler("4")}
        >
          <img
            className="profile-btn-img"
            src="/assets/avatars/4.png"
            alt="1"
          />
        </button>
        <button
          className="profile-btn-change-avatar"
          onClick={() => changeAvatarHandler("5")}
        >
          <img
            className="profile-btn-img"
            src="/assets/avatars/5.png"
            alt="1"
          />
        </button>
        <button
          className="profile-btn-change-avatar"
          onClick={() => changeAvatarHandler("6")}
        >
          <img
            className="profile-btn-img"
            src="/assets/avatars/6.png"
            alt="1"
          />
        </button>
        <button
          className="noImg-btn"
          onClick={() => changeAvatarHandler("default")}
        >
          <img
            alt="delete"
            src="/assets/profilePage/recycle-bin-line-icon.svg"
            style={{ scale: "0.66" }}
          />
        </button>

        <button className="noImg-btn" onClick={() => setEditPic(false)}>
          <img alt="cancel" src="/assets/profilePage/cancel-icon.svg" />
        </button>
      </div>
    </div>
  );
}
