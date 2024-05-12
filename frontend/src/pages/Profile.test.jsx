import { render, screen } from "@testing-library/react";
import Profile from "./Profile.jsx";
import { MemoryRouter } from "react-router"; //add to fix error of link

import { Provider } from "react-redux";
import store from "../store/index.js";
import userEvent from "@testing-library/user-event";

describe("Profile", () => {
  it("renders the Profile component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </Provider>
    );

    //expect(1 + 1).toEqual(2);

    const headerElement = screen.getByText("Welcome to Expense Tracker");
    expect(headerElement).toBeVisible;
    const paragraphElement = screen.getByText("Your Profile is incomplete");
    expect(paragraphElement).toBeVisible;
  });
});
