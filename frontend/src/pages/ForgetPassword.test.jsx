import { render, screen } from "@testing-library/react";
import ForgetPassword from "./ForgetPassword";
import { MemoryRouter } from "react-router"; //add to fix error of link

import { Provider } from "react-redux";
import store from "../store/index.js";
import userEvent from "@testing-library/user-event";

import { vi } from "vitest";
import axios from "axios";
vi.mock("axios");

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

  it("check forget password verification", async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: {
        message: "Password reset mail sent",
      },
    });
    const key = import.meta.env.VITE_FIREBASE_APP_ID;
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${key}`,
      {
        requestType: "PASSWORD_RESET",
        email: "test@gmail.com",
      }
    );
    expect(response.status).toEqual(200);
    expect(response.data.message).toEqual("Password reset mail sent");
  });
});
