import React, { useState } from "react";
import "./StartPage.css";
import Button from "../../atoms/Button/Button";
import RegisterModal from "../../molecules/StartPageModalRegister/StartPageModalRegister";
import LoginModal from "../../molecules/StartPageModalLogin/StartPageModalLogin";

export default function StartPage() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <>
      <div id="startPageContainer">
        <div id="startPageLeftSide">
          <h1 id="startPageBigTitle">Elbrus Chess</h1>
          <h3 id="startPageSmallTitle">Where strategy meets art</h3>
          <img
            id="startPagePurplePieces"
            src="./assets/startPage/purplePieces.png"
            alt="purplePieces"
          />
          <div>
            <div id="button-container">
              <Button
                text="Login"
                width="150px"
                height="60px"
                onClick={() => setShowLoginModal(true)}
              />
              <Button
                text="Register"
                width="150px"
                height="60px"
                onClick={() => setShowRegisterModal(true)}
              />
              <div id="signInDiv"></div>
            </div>
          </div>
        </div>

        <img
          id="startPageGameboard"
          src="./assets/startPage/boardStartPage.png"
          alt="purplePieces"
        />
        <img
          id="startPageKnightBG"
          src="./assets/startPage/bigKnightBG.png"
          alt="purplePieces"
        />
      </div>
      {showRegisterModal && (
        <RegisterModal setShowRegisterModal={setShowRegisterModal} />
      )}
      {showLoginModal && <LoginModal setShowLoginModal={setShowLoginModal} />}
    </>
  );
}
