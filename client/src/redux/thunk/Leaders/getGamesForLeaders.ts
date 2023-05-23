import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGame } from "../../../types";

export const getGamesForLeaders = createAsyncThunk<IGame[], void>(
  "leaders/getGamesForLeaders",
  async () => {
    try {
      const response = await fetch("http://localhost:3001/leaders", {
        credentials: "include",
      });
      const result: IGame[] = await response.json();

      console.log("RESULT from getGames thunk", result);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch games");
    }
  }
);
