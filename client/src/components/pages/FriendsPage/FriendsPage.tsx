import React, { useState } from "react";
import Navbar from "../../organisms/Navbar/Navbar";
import Friends from "../../molecules/Friends/Friends";
import "./FriendsPage.css";

function FriendPage() {
  return (
    <div className="main-page-wrapper">
      <Navbar />
      <Friends />
    </div>
  );
}

export default FriendPage;
