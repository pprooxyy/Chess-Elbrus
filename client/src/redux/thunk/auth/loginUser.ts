import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginForm } from "../../../types";

export const loginUser = createAsyncThunk(
  'login/user',
  async(user: ILoginForm) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      });
      const result = await response.json();
      console.log("result from login thunk: ", result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
)