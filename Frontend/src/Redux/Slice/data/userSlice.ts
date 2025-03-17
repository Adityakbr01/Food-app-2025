import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Initial user state null hogi
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // User data store karein
      state.isAuthenticated = true; // User authenticated mark karein
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
