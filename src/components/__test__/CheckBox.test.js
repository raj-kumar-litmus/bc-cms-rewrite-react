import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckBox from "../CheckBox";

describe("<CheckBox />", () => {
  it("render CheckBox page with correct text", () => {
    const agreeText = "Agree to Terms and conditions";
    const { queryByText, rerender } = render(<CheckBox text={agreeText} />);
    expect(queryByText(agreeText)).toBeTruthy();

    // Change props
    rerender(<CheckBox text={"Assign to Me"} />);
    expect(queryByText("Assign to Me")).toBeTruthy();

    // Negative test Case
    expect(queryByText("Assign")).toBeFalsy();
  });

  it("Checkbox checks and unchecks as expected", () => {
    const agreeText = "Agree to Terms and conditions";
    let CLICK_COUNTER = 0;
    render(
      <CheckBox
        inputClassName={"w-[18px]"}
        onChange={() => (CLICK_COUNTER += 1)}
        text={agreeText}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(CLICK_COUNTER).toEqual(1);
    expect(checkbox.checked).toEqual(true);
    fireEvent.click(checkbox);
    expect(CLICK_COUNTER).toEqual(2);
    expect(checkbox.checked).toEqual(false);
  });
});
