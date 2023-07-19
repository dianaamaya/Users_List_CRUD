import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../services/userApi";

interface IState {
  userToDelete: IUser | null;
  usersInPage: IUser[];
  loadingUsersInPage: boolean;
}

const initialState: IState = {
  userToDelete: null,
  usersInPage: [],
  loadingUsersInPage: false
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserToDelete: (state, action) => {
      state.userToDelete = action.payload
    },
    removeUserToDelete: (state) => {
      state.userToDelete = null
    },
    setUsersInPage: (state, action) => {
      state.usersInPage = [...action.payload]
    },
    setLoadingUsersInPage: (state, action) => {
      state.loadingUsersInPage = action.payload
    }
  }
});

export const { 
  setUserToDelete, 
  removeUserToDelete, 
  setUsersInPage, 
  setLoadingUsersInPage
} = userSlice.actions;
export default userSlice.reducer;
