import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import BasicDropDown from "../BasicDropdown";

export async function selectItem(label) {
  // Focus and enable the dropdown of options
  fireEvent.keyDown(screen.getByLabelText("dropdown"), {
    keyCode: 40
  });
  // Select the item
  fireEvent.click(screen.getByText(label));
  // Wait for your choice to be set as the input value
  await screen.findByText(label);
}

describe("<BasicDropDown />", () => {
  it("render single value DropDown with provided options and changes value as expected", async () => {
    render(
      <BasicDropDown
        isClearable={true}
        isMulti={false}
        classNamePrefix={"multi-dropdown"}
        placeholder="Choose something"
        options={[
          { value: "purple", label: "Purple" },
          { value: "orange", label: "Orange" },
          { value: "yellow", label: "Yellow" },
          { value: "blue", label: "Blue" },
          { value: "green", label: "Green" },
          { value: "pink", label: "Pink" }
        ]}
        isDisabled={false}
        isLoading={false}
        hasCustomOption={false}
      />
    );
    await selectItem("Green");
    expect(screen.getByText("Green")).toBeInTheDocument();
  });

  it("render multi value DropDown with provided options and changes value as expected", async () => {
    render(
      <BasicDropDown
        isClearable={true}
        isMulti={true}
        classNamePrefix={"multi-dropdown"}
        placeholder="Choose something"
        options={[
          { value: "purple", label: "Purple" },
          { value: "orange", label: "Orange" },
          { value: "yellow", label: "Yellow" },
          { value: "blue", label: "Blue" },
          { value: "green", label: "Green" },
          { value: "pink", label: "Pink" }
        ]}
        isDisabled={false}
        isLoading={false}
        hasCustomOption={false}
      />
    );
    await selectItem("Yellow");
    await selectItem("Pink");
    await selectItem("Blue");
    expect(screen.getByText("Pink")).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument();
    expect(screen.getByText("Yellow")).toBeInTheDocument();
  });
});
