import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  token: "",
  userId: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      const response = action.payload;
      console.log(response);

      state.token = response.idToken;
      localStorage.setItem("token", response.idToken);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = "";
      state.userId = "";
      localStorage.removeItem("token");
    },
    register(state) {},
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
