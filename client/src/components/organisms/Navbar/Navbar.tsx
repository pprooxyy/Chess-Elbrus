import React, { MouseEventHandler, useCallback, useEffect, useMemo, useState } from "react";

import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useAppDispatch, useAppSelector } from "../../../redux/typesRedux";
import { getUser } from "../../../redux/thunk/auth/getUser";
import { logoutUser } from "../../../redux/thunk/auth/logoutUser";





export default function Navbar() {
  const user = useSelector((state: RootState) => state.authSlicer.user);
  const dispatch = useAppDispatch();
  const navigate= useNavigate();
  const logoutHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) =>{
      e.preventDefault();
      dispatch(logoutUser())
      navigate('/') 
    }
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
        <Link to={`/profile/${user?.id}`}>
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

          <li className="nav-item log-out" onClick={logoutHandler}>

            <img
              className="navbar-icon"
              src="/assets/navbar-icons/pawn.png"
              alt="elbrus-logo"
            />
            Logout
          </li>
        
      </ul>
    </div>
  );
}
