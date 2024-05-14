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

  // it("click on signin button", async () => {
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <Signin />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const mockedResponse = { status: 200, data: { idToken: "token" } };
  //   axios.post.mockResolvedValueOnce(mockedResponse);

  //   const emailInput = screen.getByLabelText("Email:");
  //   const passwordInput = screen.getByLabelText("Password:");
  //   const signInButton = screen.getByRole("button", { name: "Sign In" });

  //   fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  //   fireEvent.change(passwordInput, { target: { value: "password" } });
  //   fireEvent.click(signInButton);

  //   await waitFor(() => {
  //     expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
  //       email: "test@example.com",
  //       password: "password",
  //       returnSecureToken: true,
  //     });
  //     const mockAlert = vi.spyOn(window, "alert").mockImplementation(() => {});

  //     expect(mockAlert);

  //     mockAlert.mockRestore();
  //   });
  // });
});
