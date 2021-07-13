/* this is the data layer we set up to push user information and we can acees this information
anywhere in our app */

import { createSlice } from "@reduxjs/toolkit";
// initialising the user
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      //fire off when user logs in and sets the user to the payload which is
      state.user = action.payload; // value that we shoot from the font end
    },
    logout: (state) => {
      // fire off when user log out and sets the user to null
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user; //to get the user's current information in our pages we export it

export default userSlice.reducer;
// {value: 1}
