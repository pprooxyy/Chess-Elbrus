import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILeaderState, IGame } from "../../types";
import { getGamesForLeaders } from "../thunk/Leaders/getGamesForLeaders";

const initialState: ILeaderState = {
  games: [],
  isLoading: false,
  error: null,
};

const leaderSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGamesForLeaders.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error when request starts
      })
      .addCase(
        getGamesForLeaders.fulfilled,
        (state, action: PayloadAction<IGame[]>) => {
          state.games = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(getGamesForLeaders.rejected, (state, action) => {
        state.games = [];
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default leaderSlice.reducer;
