import React from "react";
import { render } from "@testing-library/react";
import WordBetweenHorizontalLine from "../WordBetweenHorizontalLine";

describe("<WordBetweenHorizontalLine />", () => {
  it("render and rerender Element with the correct text passed via props", () => {
    const { container, getByText, rerender } = render(
      <WordBetweenHorizontalLine text="HELLO" lineColor="bg-red-100" />
    );

    expect(getByText("HELLO")).toBeTruthy();
    expect(container.getElementsByClassName("bg-red-100").length).toBe(2);

    rerender(<WordBetweenHorizontalLine text="WORLD" lineColor="bg-red-100" />);
    expect(getByText("WORLD")).toBeTruthy();
  });
});
