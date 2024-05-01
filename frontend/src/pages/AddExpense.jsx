import React, { useContext, useRef, useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ExpenseContext from "../store/expense-context";

function AddExpense() {
  const amountRef = useRef(null);
  const descRef = useRef(null);
  const categoryRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [editExpenseId, setEditExpenseId] = useState(null);

  const expenseContext = useContext(ExpenseContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = amountRef.current.value;
    const desc = descRef.current.value;
    const category = categoryRef.current.value;

    const obj = {
      exp_amount: amount,
      exp_desc: desc,
      exp_category: category,
    };

    if (editExpenseId !== null) {
      expenseContext.updateExpense(editExpenseId, obj);
      setEditExpenseId(null);
    } else {
      console.log(obj);
      expenseContext.addExpense(obj);
    }

    amountRef.current.value = "";
    descRef.current.value = "";
    categoryRef.current.value = "";
  };

  const editHandler = (itemId) => {
    console.log("edit", itemId);
    setEditExpenseId(itemId);
    const expense = expenseContext.expenses[itemId];
    amountRef.current.value = expense.exp_amount;
    descRef.current.value = expense.exp_desc;
    categoryRef.current.value = expense.exp_category;
  };

  const deleteHandler = (itemId) => {
    console.log("delete", itemId);
    expenseContext.removeExpense(itemId);
  };

  // useEffect(() => {
  //   expenseContext.fetchExpense();
  // }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>
          <Card style={{ padding: "20px", maxWidth: "400px" }}>
            <h2>Add Expense</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="amount">Amount:</label>
                <input type="number" id="amount" ref={amountRef} required />
              </div>
              <div>
                <label htmlFor="desc">Description:</label>
                <br />
                <textarea id="desc" ref={descRef} required />
              </div>
              <div>
                <label htmlFor="category">Category:</label>
                <br />
                <select id="category" ref={categoryRef}>
                  <option value="food">Food</option>
                  <option value="petrol">Petrol</option>
                  <option value="salary">Salary</option>
                </select>
              </div>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Adding Expense..." : "Add Expense"}
              </Button>
            </form>
          </Card>
        </div>

        <div>
          <h3>Expenses</h3>
          <ul>
            {/* {expenseContext.expenses.map((expense, index) => (
              <li key={index}>
                Amount: {expense.exp_amount}, Description: {expense.exp_desc},
                Category: {expense.exp_category}
              </li>
            ))} */}
            {expenseContext.expenses &&
              Object.keys(expenseContext.expenses).map((expenseKey) => (
                <li key={expenseKey}>
                  Amount: {expenseContext.expenses[expenseKey].exp_amount},
                  Description: {expenseContext.expenses[expenseKey].exp_desc},
                  Category: {expenseContext.expenses[expenseKey].exp_category}
                  <Button
                    variant="success"
                    onClick={() => editHandler(expenseKey)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteHandler(expenseKey)}
                  >
                    Delete
                  </Button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default AddExpense;
