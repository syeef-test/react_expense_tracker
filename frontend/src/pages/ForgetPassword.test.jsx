import { render, screen } from "@testing-library/react";
import ForgetPassword from "./ForgetPassword";
import { MemoryRouter } from "react-router"; //add to fix error of link

import { Provider } from "react-redux";
import store from "../store/index.js";

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
});
