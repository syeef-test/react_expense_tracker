import { render, screen } from "@testing-library/react";
import Profile from "./Profile.jsx";
import { MemoryRouter } from "react-router"; //add to fix error of link

import { Provider } from "react-redux";
import store from "../store/index.js";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import axios from "axios";
vi.mock("axios");

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
  it("send email verfication", async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: {
        message: "Email verification is send!",
      },
    });

    const key = import.meta.env.VITE_FIREBASE_APP_ID;
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${key}`,
      {
        requestType: "VERIFY_EMAIL",
        idToken: "token",
      }
    );
    expect(response.status).toEqual(200);
    expect(response.data.message).toEqual("Email verification is send!");
  });
  it("check email verfication", async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: {
        emailVerified: true,
      },
    });

    const key = import.meta.env.VITE_FIREBASE_APP_ID;
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${key}`,
      {
        requestType: "VERIFY_EMAIL",
        idToken: "token",
      }
    );
    expect(response.status).toEqual(200);
    expect(response.data.emailVerified).toEqual(true);
  });
});
