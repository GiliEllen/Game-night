import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

import { login } from "./userAPI";
import { User } from "./usersModel";

export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}

export interface UserState {
  user: User | null;
  status: Status;
}

const initialState: UserState = {
  user: null,
  status: Status.IDLE,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = Status.IDLE;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.status = Status.FAILED;
      });
  },
});

//login
export const {logoutUser} =userSlice.actions
export const userSelector = (state: RootState) => state.user.user;
export const userStausSelector = (state: RootState) => state.user.status;

export default userSlice.reducer;
