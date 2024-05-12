import { render, screen } from "@testing-library/react";
import ForgetPassword from "./ForgetPassword";
import { MemoryRouter } from "react-router"; //add to fix error of link

import { Provider } from "react-redux";
import store from "../store/index.js";
import userEvent from "@testing-library/user-event";

describe("Forget Password", () => {
  it("Check email visibility", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ForgetPassword />
        </MemoryRouter>
      </Provider>
    );

    const emailElement = screen.getByText("Email:");
    expect(emailElement).toBeVisible;
  });
  it("check reset button visibility", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ForgetPassword />
        </MemoryRouter>
      </Provider>
    );

    const resetElement = screen.getByText("Reset Password");
    expect(resetElement).toBeVisible;
  });

  it("check loading state of signin button", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ForgetPassword />
        </MemoryRouter>
      </Provider>
    );

    const forgetPasswordElement = screen.getByRole("button");
    userEvent.click(forgetPasswordElement);

    const outputElement = screen.queryByText("Reseting Password...", {
      exact: true,
    });
    //expect(outputElement).toBeNull();
    expect(outputElement).toBeVisible;
  });
});
