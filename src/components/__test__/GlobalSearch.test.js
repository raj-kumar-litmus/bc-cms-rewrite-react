import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import GlobalSearch from "../GlobalSearch";
import { BrowserRouter } from "react-router-dom";

describe("<GlobalSearch />", () => {
  it("render GlobalSearch page", async () => {
    let rendered;

    await act(async () => {
      rendered = render(<GlobalSearch value={true}  searchString={"Search"}/>, {
        wrapper: BrowserRouter
      });
    });
    getByPlaceholderText = screen.getByPlaceholderText;
    expect(
      getByPlaceholderText("Search by Style or Title or Brand")
    ).toBeTruthy();
    expect(screen.queryByText("Search")).toBeTruthy();
    const cancelButton = screen.queryByText("Search");
    fireEvent.click(cancelButton);
    const closeButton = screen.getByPlaceholderText("Search by Style or Title or Brand");
    fireEvent.change(closeButton);
  });
});
