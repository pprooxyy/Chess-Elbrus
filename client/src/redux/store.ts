import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./slicers/auth.slicer";
import historySlicer from "./slicers/history.slicer";
import profileSlicer from "./slicers/profile.slicer";
import leaderSlice from "./slicers/leaders.slicer";

export const store = configureStore({
  reducer: { authSlicer, profileSlicer, leaderSlice, historySlicer},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
