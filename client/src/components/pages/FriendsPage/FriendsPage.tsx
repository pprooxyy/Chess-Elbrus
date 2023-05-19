import React, { useState } from "react";
import "./Friends.css";
import Navbar from "../../organisms/Navbar/Navbar";
import Friends from "../../molecules/Friends/Friends";

function FriendPage() {
  return (
    <div className="main-page-wrapper">
      <Navbar />
      <Friends />
    </div>
  );
}

export default FriendPage;
