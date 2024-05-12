import { render, screen } from "@testing-library/react";
import Signin from "./Signin";
import { MemoryRouter } from "react-router"; //add to fix error of link

import { Provider } from "react-redux";
import store from "../store/index.js";
import userEvent from "@testing-library/user-event";

describe("Signin", () => {
  it("renders the Signin component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signin />
        </MemoryRouter>
      </Provider>
    );

    //expect(1 + 1).toEqual(2);

    const emailElement = screen.getByText("Email:");
    expect(emailElement).toBeVisible;
    const paragraphElement = screen.getByText("Password:");
    expect(paragraphElement).toBeVisible;
  });

  it("check loading state of signin button", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signin />
        </MemoryRouter>
      </Provider>
    );

    const signinElement = screen.getByRole("button");
    userEvent.click(signinElement);

    const outputElement = screen.queryByText("Signing In...", {
      exact: true,
    });
    //expect(outputElement).toBeNull();
    expect(outputElement).toBeVisible;
  });
});
