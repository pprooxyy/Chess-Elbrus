import React, { useEffect } from "react";
import "./MainPageNews.css";
import { useAppDispatch, useAppSelector } from "../../../redux/typesRedux";
import { getChessComLeaders } from "../../../redux/thunk/mainPage/getChessComLeaders";
import { RootState } from "../../../redux/store";
import { Link } from "react-router-dom";

function MainNews() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getChessComLeaders());
  }, []);

  const chessCom = useAppSelector(
    (state: RootState) => state.mainPageSlicer.leaderboard
  );
  console.log(chessCom);
  return (
    <div className="news-wrapper">
      <h1>Follow what’s happening in Chess Today</h1>
      <div className="news-container">
        {chessCom.map((item: any) => (
          <div className="newsList-item" key={item.player_id}>
            <p># {item.rank}</p>
            <img
              src={item.avatar}
              alt="avatar"
              className="newsList-item-avatar"
            />
            <div className="newsList-item-info">
              <p>username: {item.username}</p>
              <p>score: {item.score}</p>
              <p>wins: {item.win_count}</p>
              <p>losses: {item.loss_count}</p>
              <p>draws: {item.draw_count}</p>
              <p>username: {item.username}</p>
              <p>
                <Link to={item.url}>Link</Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainNews;
