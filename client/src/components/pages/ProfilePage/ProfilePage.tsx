import React from "react";

import "./ProfilePage.css";
import Navbar from "../../organisms/Navbar/Navbar";
import MainProfilePage from "../../organisms/Profile/Profile";

export default function Profile() {
  return (
    <div className="Profile-wrapper">
      <Navbar />
      <MainProfilePage />
    </div>
  );
}
