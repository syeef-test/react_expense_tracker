import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = { expenses: "" };

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    addExpense(state, action) {
      // console.log("reduxers", action.payload);
      state.expenses = action.payload;
    },
    removeExpense(state) {
      console.log("remove");
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
