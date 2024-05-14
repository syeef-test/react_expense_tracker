import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signin from "./Signin";
import { MemoryRouter } from "react-router"; //add to fix error of link

import { Provider } from "react-redux";
import store from "../store/index.js";
import userEvent from "@testing-library/user-event";
import Profile from "../pages/Profile.jsx";
import { vi } from "vitest";
import axios from "axios";
vi.mock("axios");

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

  //Test for async

  it("mock signin post request", async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: {
        message: "User signed in successfully!",
        idToken: "token",
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
    expect(response.data.message).toEqual("User signed in successfully!");
  });
});
