import { createAsyncThunk } from "@reduxjs/toolkit";

type EdituserThunkProps = {
  newName: string;
  newPic: string;
};

export const editUser = createAsyncThunk(
  "profile/edituser",
  async (editedUserInfo: EdituserThunkProps) => {
    try {
      console.log("===>", editedUserInfo);
      const response = await fetch("http://localhost:3001/profile", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUserInfo),
      });

      const result = await response.json();
      console.log("result from EditUserThunk", result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);
