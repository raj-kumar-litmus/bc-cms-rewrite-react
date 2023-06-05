import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import GlobalSearch from "../GlobalSearch";
import { BrowserRouter } from "react-router-dom";
import { async } from "regenerator-runtime";

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
      rendered = render(
        <GlobalSearch value={"test"} searchString={"Search"} />,
        {
          wrapper: BrowserRouter
        }
      );
    });
    getByPlaceholderText = screen.getByPlaceholderText;
    expect(
      getByPlaceholderText("Search by Style or Title or Brand")
    ).toBeTruthy();
    expect(screen.queryByText("Search")).toBeTruthy();
    expect(screen.getByTestId("test-img")).toBeTruthy();
  });

  const setup = () => {
    const utils = render(<GlobalSearch value="test"  searchString={"Search"}/>);
    const input = screen.getByPlaceholderText(
      "Search by Style or Title or Brand"
    );
    return {
      input,
      ...utils
    };
  };

  it("onChange of search input", async () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: "test" } });
    expect(screen.getByTestId("test-img")).toBeTruthy();
    const getCloseIcon = screen.getByTestId("test-img");
    await act(async () => {
      fireEvent.click(getCloseIcon);
    });
    expect(
      screen.getByPlaceholderText("Search by Style or Title or Brand")
    ).toBeTruthy();
  });

  it("onClick of search button", async() => {
    const onClick = jest.fn();
    render(<GlobalSearch onClick={onClick} />);
    fireEvent.click(screen.getByRole("button", /Search/i));
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it("API call on Search click", async() => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: "test" } })
    fireEvent.click(screen.getByText("Search"))
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
});
