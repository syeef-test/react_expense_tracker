import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ExpenseContext from "../store/expense-context";

function AddExpense() {
  const amountRef = useRef(null);
  const descRef = useRef(null);
  const categoryRef = useRef(null);
  const [loading, setLoading] = useState(false);

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

    console.log(obj);
    expenseContext.addExpense(obj);
  };
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
            {expenseContext.expenses.map((expense, index) => (
              <li key={index}>
                Amount: {expense.exp_amount}, Description: {expense.exp_desc},
                Category: {expense.exp_category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default AddExpense;
