import React, { useState } from "react";
import "./Friends.css";
import Button from "../../atoms/Button/Button";

function Friends() {
  return (
    <div className="main-container">
      <div className="mainFriendContainer">
        <h1 className="title-friends">Friends</h1>
        <h3 className="text-title-h3">Игры онлайн</h3>
        <div>
          <div className="flexLook">
            <div className="FriendVsFriend">Nick vs Petiya</div>
            {"_"}
            <div>
              <Button text="Look this game" />
            </div>
          </div>
        </div>
        <h3 className="text-title-h3">Отправить вызов другу</h3>
        <div className="flexLook">
          <div className="FriendVsFriend">Nick</div>
          <div>
            <Button text={"send invite"} height="40px" width="200px" />
          </div>
          <div>
            <Button text={"Generate Invite Link"} width="290px" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Friends;
