import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act
} from "@testing-library/react";
import "@testing-library/jest-dom";
import AssignStyle from "../assignStyle";

describe("<StyleDetails />", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        members: [
          {
            displayName: "raj",
            id: "raj"
          },
          {
            displayName: "kumar",
            id: "kumar"
          },
          {
            displayName: "john",
            id: "john"
          },
          {
            displayName: "smith",
            id: "smith"
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

  it("render StyleDetails with various elements for Assign to writer", async () => {
    let queryByText;
    let rendered;

    await act(async () => {
      rendered = render(
        <AssignStyle
          isModalVisible={true}
          userGroup="writers"
          styles={["A1156J1", "A1156J2", "A11563", "A11564"]}
        />,
        {
          wrapper: BrowserRouter
        }
      );
    });
    queryByText = rendered.queryByText;

    expect(queryByText("Assign Me")).toBeTruthy();
    expect(queryByText("Cancel")).toBeTruthy();
    expect(queryByText("Save")).toBeTruthy();
    expect(queryByText("Or")).toBeTruthy();
    expect(queryByText("Select Writer")).toBeTruthy();
    expect(queryByText("Assign Writer for")).toBeTruthy();
    expect(queryByText("A1156J1, A1156J2, A11563, A11564")).toBeTruthy();

    // click on dropdown & check if dropdown elements are displayed
    fireEvent.keyDown(screen.getByLabelText("dropdown"), {
      keyCode: 40
    });

    expect(screen.getByText("raj")).toBeInTheDocument();
    expect(screen.getByText("kumar")).toBeInTheDocument();
    expect(screen.getByText("john")).toBeInTheDocument();
    expect(screen.getByText("smith")).toBeInTheDocument();
  });

  it("render StyleDetails with various elements for Assign to editor", async () => {
    let queryByText;
    let rendered;

    await act(async () => {
      rendered = render(
        <AssignStyle
          isModalVisible={true}
          userGroup="editors"
          styles={["A1156J1", "A1156J2", "A11563", "A11564"]}
        />,
        {
          wrapper: BrowserRouter
        }
      );
    });
    queryByText = rendered.queryByText;

    expect(queryByText("Assign Me")).toBeTruthy();
    expect(queryByText("Cancel")).toBeTruthy();
    expect(queryByText("Save")).toBeTruthy();
    expect(queryByText("Or")).toBeTruthy();
    expect(queryByText("Select Editor")).toBeTruthy();
    expect(queryByText("Assign Editor for")).toBeTruthy();
    expect(queryByText("A1156J1, A1156J2, A11563, A11564")).toBeTruthy();

    // click on dropdown & check if dropdown elements are displayed
    fireEvent.keyDown(screen.getByLabelText("dropdown"), {
      keyCode: 40
    });

    expect(screen.getByText("raj")).toBeInTheDocument();
    expect(screen.getByText("kumar")).toBeInTheDocument();
    expect(screen.getByText("john")).toBeInTheDocument();
    expect(screen.getByText("smith")).toBeInTheDocument();
  });

  it("When large number of styles are passed, then the header should be cropped", async () => {
    let queryByText;
    let rendered;

    await act(async () => {
      rendered = render(
        <AssignStyle
          isModalVisible={true}
          styles={[
            "A1156J1",
            "A1156J2",
            "A11563",
            "A11564",
            "A1156J1",
            "A1156J2",
            "A11563",
            "A11564",
            "A1156J1",
            "A1156J2",
            "A11563",
            "A11564",
            "A1156J1",
            "A1156J2",
            "A11563",
            "A11564"
          ]}
        />,
        {
          wrapper: BrowserRouter
        }
      );
    });
    queryByText = rendered.queryByText;

    expect(queryByText("Assign Writer for")).toBeTruthy();
    expect(screen.getByText("+7 More")).toBeInTheDocument();
  });

  it("render StyleDetails and show no dropdown elements if api throws error", async () => {
    let queryByText;
    let rendered;

    jest.spyOn(global, "fetch").mockImplementation(() => {
      throw new Error();
    });

    await act(async () => {
      rendered = render(
        <AssignStyle
          isModalVisible={true}
          userGroup="writers"
          styles={["A1156J1", "A1156J2", "A11563", "A11564"]}
        />,
        {
          wrapper: BrowserRouter
        }
      );
    });
    queryByText = rendered.queryByText;

    expect(() => screen.getByText("raj")).toThrow();
    expect(() => screen.getByText("kumar")).toThrow();
    expect(() => screen.getByText("john")).toThrow();
    expect(() => screen.getByText("smith")).toThrow();
  });

  it("On clicking Cancel, the modal should be hidden", async () => {
    const Component = (
      <AssignStyle
        isModalVisible={true}
        setIsModalVisible={() => (HIDE_MODAL_COUNTER += 1)}
        userGroup="writers"
        styles={["A1156J1", "A1156J2", "A11563", "A11564"]}
      />
    );
    let HIDE_MODAL_COUNTER = 0;
    const { rerender } = render(Component, {
      wrapper: BrowserRouter
    });
    const cancelButton = screen.getByLabelText("Hide-Assign-Modal");
    fireEvent.click(cancelButton);
    await waitFor(
      () => {
        // tracking the number of clicks on the cancel Button
        expect(HIDE_MODAL_COUNTER).toEqual(1);
      },
      { timeout: 3000 }
    );
    rerender(Component, {
      wrapper: BrowserRouter
    });
    fireEvent.click(cancelButton);
    await waitFor(
      () => {
        expect(HIDE_MODAL_COUNTER).toEqual(2);
      },
      { timeout: 3000 }
    );
  });

  it("On clicking Submit, the modal should be hidden and submit method should be invoked", async () => {
    const Component = (
      <AssignStyle
        isModalVisible={true}
        setStyleAssigned={() => (INVOKE_SUBMIT_METHOD += 1)}
        userGroup="writers"
        styles={["A1156J1", "A1156J2", "A11563", "A11564"]}
      />
    );
    let INVOKE_SUBMIT_METHOD = 0;
    const { rerender } = render(Component, {
      wrapper: BrowserRouter
    });
    const submitButton = screen.getByLabelText("Assign-Style");
    fireEvent.click(submitButton);
    await waitFor(
      () => {
        // tracking the number of clicks on the submit Button
        expect(INVOKE_SUBMIT_METHOD).toEqual(1);
      },
      { timeout: 3000 }
    );
    rerender(Component, {
      wrapper: BrowserRouter
    });
    fireEvent.click(submitButton);
    await waitFor(
      () => {
        expect(INVOKE_SUBMIT_METHOD).toEqual(2);
      },
      { timeout: 3000 }
    );
  });

  it("Click on Assign me checkbox", async () => {
    await act(async () => {
      render(
        <AssignStyle
          isModalVisible={true}
          userGroup="editors"
          styles={["A1156J1", "A1156J2", "A11563", "A11564"]}
        />,
        {
          wrapper: BrowserRouter
        }
      );
    });
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
  });
});
