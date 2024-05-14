import { render, screen } from "@testing-library/react";
import UpdateProfile from "./UpdateProfile";
import { MemoryRouter } from "react-router"; //add to fix error of link

import { Provider } from "react-redux";
import store from "../store/index.js";
import userEvent from "@testing-library/user-event";

import { vi } from "vitest";
import axios from "axios";
vi.mock("axios");

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
  it("fetch userinfo in update page", async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: {
        displayName: "test",
        photoUrl: "http://test.com",
      },
    });

    const key = import.meta.env.VITE_FIREBASE_APP_ID;
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${key}`,
      {
        idToken: "token",
      }
    );
    expect(response.status).toEqual(200);
    expect(response.data.displayName).toEqual("test");
    expect(response.data.photoUrl).toEqual("http://test.com");
  });
  it("update userinfo in update page", async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: {
        message: "User details updated successfully!",
      },
    });

    const key = import.meta.env.VITE_FIREBASE_APP_ID;
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${key}`,
      {
        idToken: "token",
        displayName: "fullname",
        photoUrl: "profile_photo_url",
        returnSecureToken: true,
      }
    );
    expect(response.status).toEqual(200);
    expect(response.data.message).toEqual("User details updated successfully!");
  });
});
