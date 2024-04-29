import React, { useState, useEffect } from "react";

const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: (obj) => {},
  removeExpense: (obj) => {},
});

export const ExpenseContextProvider = (props) => {
  const [expense, setExpense] = useState([]);

  const addExpenseHandler = (newItems) => {
    setExpense((prevItems) => [...prevItems, { ...newItems }]);
  };

  const removeExpenseHandler = () => {
    alert("remove expense");
  };

  const contextValue = {
    expenses: expense,
    addExpense: addExpenseHandler,
    removeExpense: removeExpenseHandler,
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
