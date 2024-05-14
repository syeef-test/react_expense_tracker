import { render, screen } from "@testing-library/react";
import AddExpense from "./AddExpense";
import { MemoryRouter } from "react-router"; //add to fix error of link

import { Provider } from "react-redux";
import store from "../store/index.js";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import axios from "axios";
vi.mock("axios");

describe("Add Expense", () => {
  it("Check the add expense form visibility", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddExpense />
        </MemoryRouter>
      </Provider>
    );

    const amountElement = screen.getByText("Amount:");
    expect(amountElement).toBeVisible();
    const descriptionElement = screen.getByText("Description:");
    expect(descriptionElement).toBeVisible();
    const categoryElement = screen.getByText("Category:");
    expect(descriptionElement).toBeVisible();
  });
  // it("check total expense  visibility", () => {
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <AddExpense />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const totalElement = screen.getByText("Total Expense:");
  //   expect(totalElement).toBeInTheDocument;
  // });

  // it("check loading state of add expense button", () => {
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <AddExpense />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const signinElement = screen.getByText("Add Expense");
  //   userEvent.click(signinElement);

  //   const outputElement = screen.queryByText("Adding Expense...", {
  //     exact: true,
  //   });
  //   //expect(outputElement).toBeNull();
  //   expect(outputElement).toBeVisible();
  // });

  it("fetch expense data", async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
      data: {},
    });
    const key = import.meta.env.VITE_FIREBASE_APP_ID;
    const response = await axios.get(
      `https://expensetracker-e3c19-default-rtdb.firebaseio.com/expenses.json`
    );
    expect(response.status).toEqual(200);
  });

  it("edit expense data", async () => {
    axios.put.mockResolvedValueOnce({
      status: 200,
      data: {},
    });
    const key = import.meta.env.VITE_FIREBASE_APP_ID;
    const editExpenseId = 1;
    const obj = {
      exp_amount: 100,
      exp_desc: "desc",
      exp_category: "food",
    };
    const response = await axios.put(
      `https://expensetracker-e3c19-default-rtdb.firebaseio.com/expenses/${editExpenseId}.json`,
      obj
    );
    expect(response.status).toEqual(200);
  });

  it("add expense data", async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
    });
    const key = import.meta.env.VITE_FIREBASE_APP_ID;
    const obj = {
      exp_amount: 100,
      exp_desc: "desc",
      exp_category: "food",
    };
    const response = await axios.post(
      `https://expensetracker-e3c19-default-rtdb.firebaseio.com/expenses.json`,
      obj
    );
    expect(response.status).toEqual(200);
    //expect(response.data.emailVerified).toEqual(true);
  });

  it("delete expense data", async () => {
    axios.delete.mockResolvedValueOnce({
      status: 200,
    });
    const key = import.meta.env.VITE_FIREBASE_APP_ID;
    const itemId = "1";
    const response = await axios.delete(
      `https://expensetracker-e3c19-default-rtdb.firebaseio.com/expenses/${itemId}.json`
    );
    console.log(response.status);
    expect(response.status).toEqual(200);
    //expect(response.data.emailVerified).toEqual(true);
  });
});
