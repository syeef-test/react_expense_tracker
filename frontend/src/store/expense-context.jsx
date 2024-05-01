import React, { useState, useEffect } from "react";
import axios from "axios";

const ExpenseContext = React.createContext({
  expenses: "",
  addExpense: (obj) => {},
  removeExpense: (objid) => {},
  fetchExpense: () => {},
  updateExpense: (itemId, obj) => {},
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

  const removeExpenseHandler = async (itemId) => {
    try {
      const response = await axios.delete(
        `https://expensetracker-e3c19-default-rtdb.firebaseio.com/expenses/${itemId}.json`
      );
      console.log("context", response.status);
      if (response.status === 200) {
        // alert("Expense Added Succesfully");
        //console.log(response);
        console.log("Expense Deleted");
        fetchExpenseHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateExpenseHandler = async (itemId, item) => {
    try {
      console.log("context", itemId);
      console.log("context", item);

      const obj = {
        exp_amount: item.exp_amount,
        exp_desc: item.exp_desc,
        exp_category: item.exp_category,
      };
      const response = await axios.put(
        `https://expensetracker-e3c19-default-rtdb.firebaseio.com/expenses/${itemId}.json`,
        item
      );
      //console.log("context", response);
      if (response.status === 200) {
        // alert("Expense Added Succesfully");
        //console.log(response);
        console.log("Expense Updated");
        fetchExpenseHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    expenses: expense,
    addExpense: addExpenseHandler,
    removeExpense: removeExpenseHandler,
    fetchExpense: fetchExpenseHandler,
    updateExpense: updateExpenseHandler,
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
