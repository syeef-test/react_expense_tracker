import { render, screen } from "@testing-library/react";
import Signup from "./Signup";
import { MemoryRouter } from "react-router"; //add to fix error of link

import { Provider } from "react-redux";
import store from "../store/index.js";
import userEvent from "@testing-library/user-event";

describe("Signup", () => {
  it("Check the email and password visibility", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );

    //expect(1 + 1).toEqual(2);

    const emailElement = screen.getByText("Email:");
    expect(emailElement).toBeVisible;
    const passwordElement = screen.getByText("Password:");
    expect(passwordElement).toBeVisible;
  });
  it("check confirm passord visibility", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );

    const confirmPasswordElement = screen.getByText("Confirm Password:");
    expect(confirmPasswordElement).toBeVisible;
  });
  it("check loading state of signup button", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );

    const signupElement = screen.getByRole("button");
    userEvent.click(signupElement);

    const outputElement = screen.queryByText("Signing Up...", {
      exact: true,
    });
    //expect(outputElement).toBeNull();
    expect(outputElement).toBeVisible;
  });
});
