import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.authSlicer.user);
  console.log(user);
  return (
    <div className="nav">
      <ul>
        <li className="">
          <img
            className="elbrus-logo"
            src="/assets/navbar-icons/elbrus-logo.png"
            alt="elbrus-logo"
          />
        </li>
        <Link to="/">
          <li className="nav-item">Elbrus Chess</li>
        </Link>
        <Link to="/home">
          <li className="nav-item">
            <img
              className="navbar-icon"
              src="/assets/navbar-icons/king.png"
              alt="elbrus-logo"
            />
            Play
          </li>
        </Link>
        <Link to={`/profile/${user.id}`}>
          <li className="nav-item">
            <img
              className="navbar-icon"
              src="/assets/navbar-icons/queen.png"
              alt="elbrus-logo"
            />
            Profile
          </li>
        </Link>
        <Link to="/leaders">
          <li className="nav-item">
            <img
              className="navbar-icon"
              src="/assets/navbar-icons/bishop.png"
              alt="elbrus-logo"
            />
            Leaderboard
          </li>
        </Link>
        <Link to="/friends">
          <li className="nav-item">
            <img
              className="navbar-icon"
              src="/assets/navbar-icons/knight.png"
              alt="elbrus-logo"
            />
            Social
          </li>
        </Link>
        <Link to="/history">
          <li className="nav-item">
            <img
              className="navbar-icon"
              src="/assets/navbar-icons/rook.png"
              alt="elbrus-logo"
            />
            History
          </li>
        </Link>
        <Link to="/logout">
          <li className="nav-item log-out">
            <img
              className="navbar-icon"
              src="/assets/navbar-icons/pawn.png"
              alt="elbrus-logo"
            />
            Logout
          </li>
        </Link>
      </ul>
    </div>
  );
}
