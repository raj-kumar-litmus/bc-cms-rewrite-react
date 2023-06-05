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
    expect(screen.getByTestId("test-img")).toBeTruthy();
  });

  const setup = () => {
    const utils = render(<GlobalSearch />);
    const input = screen.getByPlaceholderText(
      "Search by Style or Title or Brand"
    );
    return {
      input,
      ...utils
    };
  };

  it("OnChange", () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: "test" } });
    expect(input.value).toBe("test");
    fireEvent.change(input, { target: { value: "" } });
    expect(input.value).toBe("");
  });

  it("onClick", () => {
    const onClick = jest.fn();
    render(<GlobalSearch onClick={onClick}/>);
    fireEvent.click(screen.getByRole("button", /Search/i));
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
