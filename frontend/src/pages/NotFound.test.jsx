import { render, screen } from "@testing-library/react";
import Notfound from "./NotFound.jsx";
import { MemoryRouter } from "react-router"; //add to fix error of link

import { Provider } from "react-redux";
import store from "../store/index.js";
import userEvent from "@testing-library/user-event";

describe("NotFound", () => {
  it("renders the NotFound component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Notfound />
        </MemoryRouter>
      </Provider>
    );

    //expect(1 + 1).toEqual(2);

    const headerElement = screen.getByText("404 Page Not Found");
    expect(headerElement).toBeVisible;
    const paragraphElement = screen.getByText(
      "Page you are refering does not exist."
    );
    expect(paragraphElement).toBeVisible;
  });
});
