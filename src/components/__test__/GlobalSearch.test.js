import React from "react";
import { render, screen, act } from "@testing-library/react";
import GlobalSearch from "../GlobalSearch";
import { BrowserRouter } from "react-router-dom";

describe("<GlobalSearch />", () => {
  it("render GlobalSearch page", async () => {
    let queryByText;
    let rendered;

    await act(async () => {
      rendered = render(<GlobalSearch value={true}  searchString={"search"}/>, {
        wrapper: BrowserRouter
      });
    });
    getByPlaceholderText = screen.getByPlaceholderText;
    expect(
      getByPlaceholderText("Search by Style or Title or Brand")
    ).toBeTruthy();
  });
});
