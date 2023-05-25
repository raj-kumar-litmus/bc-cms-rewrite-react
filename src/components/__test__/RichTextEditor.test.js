import React from "react";
import { render, act } from "@testing-library/react";
import RichTextEditor from "../RichTextEditor";

describe("<RichTextEditor />", () => {
  it("render Rich Text Area and label element", async () => {
    let container;
    let rendered;

    await act(async () => {
      rendered = render(
        <RichTextEditor
          label="Some-label"
          className="input-class"
          labelClassName="label-class"
        />
      );
    });
    container = rendered.container;

    expect(container.getElementsByClassName("input-class").length).toBe(1);
    expect(container.getElementsByClassName("label-class").length).toBe(1);
    expect(container.getElementsByClassName("ql-editor").length).toBe(1);
  });

  it("Renders with default input value", async () => {
    let container;
    let rendered;

    await act(async () => {
      rendered = render(
        <RichTextEditor
          label="Some-label"
          val="default-value"
          className="input-class"
          labelClassName="label-class"
        />
      );
    });
    container = rendered.container;

    expect(container.querySelectorAll(".ql-editor p")[0].innerHTML).toBe(
      "default-value"
    );
  });
});
