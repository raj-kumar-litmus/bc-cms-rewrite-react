import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import Textarea from "../InputTextarea";

describe("<Textarea />", () => {
  it("render Text Area and label element", () => {
    const { container } = render(
      <Textarea
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
      <Textarea
        label="Some-label"
        val="Some-value"
        className="input-class"
        labelClassName="label-class"
      />
    );
    const textArea = screen.getByLabelText("text-area");
    expect(textArea.value).toBe("Some-value");
  });

  it("Changing value of input element, changes as expected", () => {
    render(
      <Textarea
        label="Some-label"
        val=""
        className="input-class"
        labelClassName="label-class"
      />
    );
    const textArea = screen.getByLabelText("text-area");
    expect(textArea.value).toBe("");
    fireEvent.change(textArea, { target: { value: "Hello World" } });
    expect(textArea.value).toBe("Hello World");
    fireEvent.change(textArea, { target: { value: "Lorem Ipsum" } });
    expect(textArea.value).toBe("Lorem Ipsum");
  });
});
