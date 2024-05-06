import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth-reducer";
import expenseReducer from "./expense-reducer";
import themeSlice from "./theme-reducer";

const store = configureStore({
  reducer: { expense: expenseReducer, auth: authReducer, theme: themeSlice },
});

export default store;
