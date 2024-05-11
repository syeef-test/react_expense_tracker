import { render, screen } from "@testing-library/react";
import Signin from "./Signin";
import { MemoryRouter } from "react-router"; //add to fix error of link

import { Provider } from "react-redux";
import store from "../store/index.js";

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
    const passwordElement = screen.getByText("Password:");
    expect(passwordElement).toBeVisible;
  });
});
