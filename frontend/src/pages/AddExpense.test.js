import { render, screen } from "@testing-library/react";
import AddExpense from "./AddExpense";

describe("Add Expense Component", () => {
  test("", () => {
    //Arrange
    render(<AddExpense />);

    //Act
    //...nothing

    //Assert

    const totalExpenseElement = screen.getByText("Total Expneses");
    expect(totalExpenseElement).toBeInTheDocument;
  });
});
