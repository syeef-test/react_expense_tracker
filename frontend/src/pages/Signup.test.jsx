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

  it("check signup post request", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );

    const response = { status: 200, idToken: "token" };
    axios.post.mockResolvedValueOnce(response);

    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const confPasswordInput = screen.getAllByLabelText("Confirm Password:");
    const signUpButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
        email: "test@example.com",
        password: "password",
        returnSecureToken: true,
      });
    });

    const outputElement = screen.queryByText("Signing Up...", {
      exact: true,
    });
    expect(outputElement).toBeNull(); // Corrected expectation
  });
});
