import React, { useState, useEffect } from "react";
import axios from "axios";

const ExpenseContext = React.createContext({
  expenses: "",
  addExpense: (obj) => {},
  removeExpense: (obj) => {},
  fetchExpense: () => {},
});

export const ExpenseContextProvider = (props) => {
  const [expense, setExpense] = useState(null);

  const addExpenseHandler = async (newItems) => {
    // setExpense((prevItems) => [...prevItems, { ...newItems }]);
    try {
      const response = await axios.post(
        "https://expensetracker-e3c19-default-rtdb.firebaseio.com/expenses.json",
        newItems
      );
      // console.log(response);
      if (response.status === 200) {
        alert("Expense Added Succesfully");
        fetchExpenseHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExpenseHandler = async () => {
    try {
      const response = await axios.get(
        "https://expensetracker-e3c19-default-rtdb.firebaseio.com/expenses.json"
      );
      // console.log(response);
      if (response.status === 200) {
        // alert("Expense Added Succesfully");
        console.log(response);
        setExpense(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenseHandler();
    console.log(expense);
  }, []);

  const removeExpenseHandler = () => {
    alert("remove expense");
  };

  const contextValue = {
    expenses: expense,
    addExpense: addExpenseHandler,
    removeExpense: removeExpenseHandler,
    fetchExpense: fetchExpenseHandler,
  };

  useEffect(() => {
    console.log("expense:", expense);
  }, [expense]);

  return (
    <ExpenseContext.Provider value={contextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
