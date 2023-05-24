import { createSlice } from "@reduxjs/toolkit";
import { IHistoryState, IInitalHistory } from "../../types";
import { getHistory } from "../thunk/history/history";

const initialHistory = {
  id: 0,
  player1: '',
  player1Id: 0,
  player2: '',
  player2Id: 0,
  tie: false,
  winner: '',
  winnerId: 0,
  duration: 0,
  game_fen: '',
  game_start_time: '',
};

const initialState: IHistoryState = {
  history: [],
  isLoading: false,
  error: null,
}

const historySlicer = createSlice({
  name: "history",
  initialState,
  reducers: {
    setHistory(state, action) {
      state.history = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.history = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getHistory.rejected, (state, action) => {
        state.history = [];
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setHistory } = historySlicer.actions;
export default historySlicer.reducer;
