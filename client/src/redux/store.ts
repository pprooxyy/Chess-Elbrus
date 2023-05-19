import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./slicers/auth.slicer";
import profileSlicer from "./slicers/profile.slicer";

export const store = configureStore({
  reducer: { authSlicer, profileSlicer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
