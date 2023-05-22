import React from "react";
import { render, act, fireEvent, screen } from "@testing-library/react";
import NormalizationDashboard from "../NormalizationDashboard";
import { BrowserRouter } from "react-router-dom";

describe("<NormalizationDashboard />", () => {
  it("render NormalizationDashboard page", () => {
    render(<NormalizationDashboard />, { wrapper: BrowserRouter });
  });
});

describe("Testing success toast", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        members: [
          {
            displayName: "raj",
            id: "raj"
          }
        ]
      })
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    global.fetch.mockClear();
    delete global.fetch;
  });
  it("Open Dashboard, click Submit, Wait for Toast to show up", async () => {
    let queryByText;
    let rendered;
    await act(async () => {
      rendered = render(<NormalizationDashboard />, { wrapper: BrowserRouter });
    });
    queryByText = rendered.queryByText;

    const assignButton = screen.getByLabelText("temp-assign-button");

    await act(async () => {
      fireEvent.click(assignButton);
    });

    expect(queryByText("Select Writer")).toBeTruthy();
    expect(queryByText("Assign Writer for")).toBeTruthy();

    const submitButton = screen.getByLabelText("Assign-Style");
    await act(async () => {
      fireEvent.click(submitButton);
    });
    expect(queryByText("Succesfully Assigned")).toBeTruthy();
    expect(
      queryByText("David John assigned as the editor for WUSJ903")
    ).toBeTruthy();
  });
});
