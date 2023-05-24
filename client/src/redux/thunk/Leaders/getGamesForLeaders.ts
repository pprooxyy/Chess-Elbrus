import { createAsyncThunk } from "@reduxjs/toolkit";
import { IStatForLeaders } from "../../../types";

export const getGamesForLeaders = createAsyncThunk<IStatForLeaders[], void>(
  "leaders/getGamesForLeaders",
  async () => {
    try {
      const response = await fetch("http://localhost:3001/leaders", {
        credentials: "include",
      });
      const result: IStatForLeaders[] = await response.json();

      console.log("RESULT from getGames thunk", result);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch games");
    }
  }
);
