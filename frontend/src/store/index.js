import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth-reducer";
import counterReducer from "./expense-reducer";

const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer },
});

export default store;
