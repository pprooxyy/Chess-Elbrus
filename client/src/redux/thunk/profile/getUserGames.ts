import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserGames = createAsyncThunk(
  "profile/getUserGames",
  async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:3001/profile/${userId}`, {
        credentials: "include",
      });
      const result = await response.json();

      console.log("RESULT from getUserGames thunk", result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);
