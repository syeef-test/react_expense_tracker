import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation.jsx";
import { MemoryRouter } from "react-router"; //add to fix error of link

import { Provider } from "react-redux";
import store from "../store/index.js";
import userEvent from "@testing-library/user-event";

describe("Navigation", () => {
  it("renders the Navigation component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navigation />
        </MemoryRouter>
      </Provider>
    );

    //expect(1 + 1).toEqual(2);

    const headerElement = screen.getByText("Expense Tracker App");
    expect(headerElement).toBeVisible;
  });
});
