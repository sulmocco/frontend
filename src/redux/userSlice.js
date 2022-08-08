import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  NAME: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin(state, action) {
      state.isLogin = true;
      state.NAME = action.payload;
    },
    userLogout(state, action) {
      state.isLogin = false;
      state.NAME = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: {},
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
