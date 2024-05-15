import React, { useContext, useRef, useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../store/expense-reducer";

function AddExpense() {
  const amountRef = useRef(null);
  const descRef = useRef(null);
  const categoryRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [editExpenseId, setEditExpenseId] = useState(null);
  //const [expense, setExpense] = useState(null);
  const [totalExpense, setTotalExpense] = useState(0);

  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense.expenses);
  //console.log("map", expenses);

  const fetchExpenseHandler = async () => {
    try {
      const email = localStorage.getItem("email");
      let cleanedEmail = email.replace(/[@.]/g, "");

      const response = await axios.get(
        `https://expensetracker-e3c19-default-rtdb.firebaseio.com/${cleanedEmail}.json`
      );
      // console.log(response);
      if (response.status === 200) {
        // alert("Expense Added Succesfully");
        console.log(response);
        //setExpense(response.data);
        calculateTotalExpense(response.data);
        dispatch(expenseActions.addExpense(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenseHandler();
  }, []);

  const calculateTotalExpense = (expenses) => {
    let total = 0;
    for (const key in expenses) {
      total += parseFloat(expenses[key].exp_amount);
    }
    setTotalExpense(total.toFixed(2));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const amount = amountRef.current.value;
      const desc = descRef.current.value;
      const category = categoryRef.current.value;

      const obj = {
        exp_amount: amount,
        exp_desc: desc,
        exp_category: category,
      };
      const email = localStorage.getItem("email");
      let cleanedEmail = email.replace(/[@.]/g, "");
      if (editExpenseId !== null) {
        const response = await axios.put(
          `https://expensetracker-e3c19-default-rtdb.firebaseio.com/${cleanedEmail}/${editExpenseId}.json`,
          obj
        );
        //console.log("context", response);
        if (response.status === 200) {
          // alert("Expense Added Succesfully");
          //console.log(response);
          console.log("Expense Updated");
          fetchExpenseHandler();
          setEditExpenseId(null);
        }
      } else {
        const response = await axios.post(
          `https://expensetracker-e3c19-default-rtdb.firebaseio.com/${cleanedEmail}.json`,
          obj
        );

        if (response.status === 200) {
          alert("Expense Added Succesfully");
          fetchExpenseHandler();
        }

        amountRef.current.value = "";
        descRef.current.value = "";
        categoryRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = (itemId) => {
    console.log("edit", itemId);
    setEditExpenseId(itemId);
    const exp = expenses[itemId];
    amountRef.current.value = exp.exp_amount;
    descRef.current.value = exp.exp_desc;
    categoryRef.current.value = exp.exp_category;
  };

  const deleteHandler = async (itemId) => {
    try {
      const email = localStorage.getItem("email");
      let cleanedEmail = email.replace(/[@.]/g, "");
      const response = await axios.delete(
        `https://expensetracker-e3c19-default-rtdb.firebaseio.com/${cleanedEmail}/${itemId}.json`
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

  // function makeCSV(rows) {
  //   return rows.map((r) => r.join(",")).join("\n");
  // }

  const exportToCSV = () => {
    console.log("csv:", expenses);

    const objectArray = Object.values(expenses);
    console.log("values", objectArray);

    function makeCSV(rows) {
      return rows.map((r) => r.join(",")).join("\n");
    }

    const keys = objectArray.map((obj) => Object.keys(obj));
    const values = objectArray.map((obj) => Object.values(obj));
    let new_array = [];
    new_array.push(keys[0]);
    // new_array.push(values);
    values.forEach((value) => new_array.push(value));
    console.log(new_array);

    const a2 = document.getElementById("a2");
    const blob2 = new Blob([makeCSV(new_array)]);
    a2.href = URL.createObjectURL(blob2);
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
          <div>
            <h2>Total Expense:{totalExpense}</h2>
            <div>
              {totalExpense > 10000 && <Button variant="info">Premiuem</Button>}
              {totalExpense > 10000 && (
                <Button variant="success" onClick={exportToCSV}>
                  Export to CSV
                </Button>
              )}
              {totalExpense > 10000 && (
                <a id="a2" download="expenses.csv">
                  Download CSV File
                </a>
              )}
            </div>
          </div>
          <h3>Expenses</h3>
          <ul>
            {expenses &&
              Object.keys(expenses).map((expenseKey) => (
                <li key={expenseKey}>
                  Amount: {expenses[expenseKey].exp_amount}, Description:{" "}
                  {expenses[expenseKey].exp_desc}, Category:{" "}
                  {expenses[expenseKey].exp_category}
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
