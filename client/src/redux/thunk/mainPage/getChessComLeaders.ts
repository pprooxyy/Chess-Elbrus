import { createAsyncThunk } from "@reduxjs/toolkit";

export const getChessComLeaders = createAsyncThunk(
  "mainPage/getChessComLeaders",
  async () => {
    try {
      const response = await fetch(
        "https://api.chess.com/pub/leaderboards",
        {}
      );

      const result = await response.json();

      console.log("result from Chess.com thunk", result.daily);
      return result.daily;
    } catch (error) {
      console.log(error);
    }
  }
);
