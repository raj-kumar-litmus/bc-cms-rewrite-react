import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../Modal";

describe("<Modal />", () => {
  it("render element as expected", () => {
    const { getByText } = render(
      <Modal header={"Test Header"} visible={true}>
        <p>Hello world</p>
      </Modal>
    );
    expect(getByText("Hello world")).toBeTruthy();
    expect(getByText("Test Header")).toBeTruthy();
  });
  it("close Modal on clicking of cross icon", async () => {
    let isModalVisible = null;
    const { getByText } = render(
      <Modal
        header={"Test Header"}
        visible={true}
        setVisible={(val) => (isModalVisible = val)}
      >
        <p>Hello world</p>
      </Modal>
    );
    expect(getByText("Hello world")).toBeTruthy();
    const closeIcon = screen.getByLabelText("Close");
    fireEvent.click(closeIcon);
    expect(isModalVisible).toBe(false);
  });
});
