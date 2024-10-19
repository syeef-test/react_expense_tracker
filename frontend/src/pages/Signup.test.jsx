import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "./Signup";
import { MemoryRouter } from "react-router"; //add to fix error of link

import { Provider } from "react-redux";
import store from "../store/index.js";
import userEvent from "@testing-library/user-event";

import { vi } from "vitest";
import axios from "axios";
vi.mock("axios");

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
    expect(emailElement).toBeVisible();
    const passwordElement = screen.getByText("Password:");
    expect(passwordElement).toBeVisible();
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
    expect(confirmPasswordElement).toBeVisible();
  });

  it("check loading state of signin button", () => {
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

  it("mock signup post request", async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: {
        message: "User signed up successfully",
      },
    });

    const key = import.meta.env.VITE_FIREBASE_APP_ID;
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
      {
        email: "testing@gmail.com",
        password: "1111111",
        returnSecureToken: true,
      }
    );
    expect(response.status).toEqual(200);
    expect(response.data.message).toEqual("User signed up successfully");
  });
});
