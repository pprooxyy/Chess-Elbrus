import { createAsyncThunk } from "@reduxjs/toolkit";

export const getHistory = createAsyncThunk('history',  async(user, {dispatch})=> {
  try {
    const response = await fetch("http://localhost:3001/history", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
      const result = await response.json();
      return result
  } catch (error) {
    console.log(error);
  }
} )