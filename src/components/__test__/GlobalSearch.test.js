import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import GlobalSearch from "../GlobalSearch";
import { BrowserRouter } from "react-router-dom";

describe("<GlobalSearch />", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        worksFlows: [
          {
            admin: "pc.admin@backcountry.com",
            brand: "backcountry"
          },
          {
            admin: "pc.admin@backcountry.com",
            brand: "backcountry"
          },
          {
            admin: "pc.admin@backcountry.com",
            brand: "backcountry"
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

  it("render GlobalSearch page", async () => {
    let rendered;
    await act(async () => {
      rendered = render(<GlobalSearch value={true} searchString={"Search"} />, {
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
    const closeButton = screen.getByPlaceholderText(
      "Search by Style or Title or Brand"
    );
    fireEvent.change(closeButton);
  });

  it("Search button enabled", async () => {
    let rendered;
    await act(async () => {
      rendered = render(
        <GlobalSearch value={"test"} searchString={"Search"} />,
        {
          wrapper: BrowserRouter
        }
      );
    });
    expect(screen.getByTestId("test-img")).toBeTruthy();
  });

  it("will not call onClick when disabled", () => {
    const onClick = jest.fn();
    render(<GlobalSearch onClick={onClick} disabled={true} />);
    fireEvent.click(screen.getByRole("button", /Search/i));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("will call onClick when enabled", () => {
    const onClick = jest.fn();
    render(<GlobalSearch onClick={onClick} disabled={false} />);
    fireEvent.click(screen.getByRole("button", /Search/i));
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
