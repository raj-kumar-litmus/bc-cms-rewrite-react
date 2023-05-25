import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import InputBox from "../InputBox";

describe("<InputBox />", () => {
  it("render Input box with both input element and label element", () => {
    const { container } = render(
      <InputBox
        label="Some-label"
        val="Some-value"
        className="input-class"
        labelClassName="label-class"
      />
    );
    expect(container.getElementsByClassName("input-class").length).toBe(1);
    expect(container.getElementsByClassName("label-class").length).toBe(1);
  });

  it("Renders with default input value", () => {
    render(
      <InputBox
        label="Some-label"
        val="Some-value"
        className="input-class"
        labelClassName="label-class"
      />
    );
    const input = screen.getByLabelText("input-box");
    expect(input.value).toBe("Some-value");
  });

  it("Changing value of input element, changes as expected", () => {
    render(
      <InputBox
        label="Some-label"
        val=""
        className="input-class"
        labelClassName="label-class"
      />
    );
    const input = screen.getByLabelText("input-box");
    expect(input.value).toBe("");
    fireEvent.change(input, { target: { value: "Hello World" } });
    expect(input.value).toBe("Hello World");
    fireEvent.change(input, { target: { value: "Lorem Ipsum" } });
    expect(input.value).toBe("Lorem Ipsum");
  });
});
