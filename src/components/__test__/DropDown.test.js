import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent, act } from "@testing-library/react";
import MultiSelectDropDown from "../DropDown";

describe("<BasicDropDown />", () => {
  it("render Multi value DropDown with provided options and changes value as expected", async () => {
    const { container } = render(
      <MultiSelectDropDown
        label={"test-drop-down"}
        placeholder="Choose something"
        options={[
          { value: "purple", label: "Purple" },
          { value: "orange", label: "Orange" },
          { value: "green", label: "Green" },
          { value: "yellow", label: "Yellow" }
        ]}
      />
    );
    const dropDownContainer =
      container.getElementsByClassName("dropdown-heading");
    expect(dropDownContainer.length).toBe(1);
    act(() => {
      fireEvent.click(dropDownContainer[0]);
    });
    expect(screen.getByText("Orange")).toBeInTheDocument();
    expect(screen.getByText("Purple")).toBeInTheDocument();
    expect(screen.getByText("Green")).toBeInTheDocument();
    expect(screen.getByText("Yellow")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Orange"));
    fireEvent.click(screen.getByText("Purple"));
    const heading = container.querySelector(".dropdown-heading-value span");
    expect(heading).toHaveTextContent("Orange, Purple");
    fireEvent.click(screen.getByText("Yellow"));
    expect(heading).toHaveTextContent("Orange, Purple, Yellow");
  });
});
