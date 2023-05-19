import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("user/getUser", async () => {
  const response = await fetch("http://localhost:3001/auth/", {
    credentials: "include",
  });
  const user = await response.json();
  return user;
});
