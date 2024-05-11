import { render, screen } from "@testing-library/react";
import UpdateProfile from "./UpdateProfile";
import { MemoryRouter } from "react-router"; //add to fix error of link

import { Provider } from "react-redux";
import store from "../store/index.js";

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
});
