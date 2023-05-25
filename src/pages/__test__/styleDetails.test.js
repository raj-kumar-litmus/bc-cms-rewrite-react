import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import StyleDetails from "../styleDetails";

describe("<StyleDetails />", () => {
  it("render StyleDetails with various elements", () => {
    const { queryByText } = render(<StyleDetails styleId="A1156J" />, {
      wrapper: BrowserRouter
    });
    expect(queryByText("A1156J")).toBeTruthy();
    expect(queryByText("Back")).toBeTruthy();
    expect(queryByText("Category")).toBeTruthy();
    expect(queryByText("Harmonizing Attributes")).toBeTruthy();
    expect(queryByText("Tech Specs")).toBeTruthy();
    expect(queryByText("Product Info")).toBeTruthy();
    expect(queryByText("Recent History")).toBeTruthy();
    expect(queryByText("Save for later")).toBeTruthy();
    expect(queryByText("Submit")).toBeTruthy();
  });

  it("For Quick fix flow, the Publish button should be displayed instead of Submit", () => {
    const { queryByText } = render(
      <StyleDetails quickFix={true} styleId="A1156J" />,
      {
        wrapper: BrowserRouter
      }
    );
    expect(queryByText("A1156J")).toBeTruthy();
    expect(queryByText("Back")).toBeTruthy();
    expect(queryByText("Category")).toBeTruthy();
    expect(queryByText("Harmonizing Attributes")).toBeTruthy();
    expect(queryByText("Tech Specs")).toBeTruthy();
    expect(queryByText("Product Info")).toBeTruthy();
    expect(queryByText("Recent History")).toBeTruthy();
    expect(queryByText("Publish")).toBeTruthy();
  });

  it("The Back button should be clickable", () => {
    render(<StyleDetails styleId="A1156J" />, {
      wrapper: BrowserRouter
    });
    const backButton = screen.getByLabelText("navigate-back");
    fireEvent.click(backButton);
  });
});
