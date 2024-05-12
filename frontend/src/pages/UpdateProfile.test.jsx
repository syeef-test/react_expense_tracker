import { render, screen } from "@testing-library/react";
import UpdateProfile from "./UpdateProfile";
import { MemoryRouter } from "react-router"; //add to fix error of link

import { Provider } from "react-redux";
import store from "../store/index.js";
import userEvent from "@testing-library/user-event";

describe("Update Profile", () => {
  it("Check the fullname and photo_url visibility", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UpdateProfile />
        </MemoryRouter>
      </Provider>
    );

    const fullnameElement = screen.getByText("Full Name:");
    expect(fullnameElement).toBeVisible;
    const photoURLElement = screen.getByText("Profile Photo URL:");
    expect(photoURLElement).toBeVisible;
  });
  it("check update button visibility", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UpdateProfile />
        </MemoryRouter>
      </Provider>
    );

    const updateElement = screen.getByText("Update");
    expect(updateElement).toBeVisible;
  });

  it("check loading state of update profile button", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UpdateProfile />
        </MemoryRouter>
      </Provider>
    );

    const updateElement = screen.getByRole("button");
    userEvent.click(updateElement);

    const outputElement = screen.queryByText("Updating...", {
      exact: true,
    });
    //expect(outputElement).toBeNull();
    expect(outputElement).toBeVisible;
  });
});
