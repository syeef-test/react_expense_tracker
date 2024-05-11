import { render, screen } from "@testing-library/react";
import AddExpense from "./AddExpense";
import { MemoryRouter } from "react-router"; //add to fix error of link

import { Provider } from "react-redux";
import store from "../store/index.js";

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
    expect(amountElement).toBeVisible;
    const descriptionElement = screen.getByText("Description:");
    expect(descriptionElement).toBeVisible;
    const categoryElement = screen.getByText("Category:");
    expect(descriptionElement).toBeVisible;
  });
  it("check total expense  visibility", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddExpense />
        </MemoryRouter>
      </Provider>
    );

    const totalElement = screen.getByText("Total Expneses:");
    expect(totalElement).toBeVisible;
  });
});
