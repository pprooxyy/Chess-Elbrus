import React from "react";
import "./Profile.css";
import Button from "../../atoms/Button/Button";

export default function MainProfilePage() {
  const borderSize = { width: 50, height: 50 };
  return (
    <>
      <div className="main-profile-container">
        <h1>Profile Page</h1>
        <div className="profileContainer">
          <div className="profileSubDiv">
            <img
              id="profileImage"
              src="./assets/profilePage/shrekProfile.png"
            />
            <Button text="Change Avatar" height="50px" />
          </div>
          <div className="profileSubDiv">
            <div className="profileChangeName">
              <h2>Joe Doe </h2>
              <button className="btn-pencil">
                <img alt="asdfa" src="./assets/profilePage/pencil.svg" />
              </button>
            </div>
            <Button
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
            />
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
