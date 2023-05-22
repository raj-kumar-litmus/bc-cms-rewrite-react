import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

function Modal({ visible, setVisible, className, children, header }) {
  return (
    <Dialog
      header={header}
      visible={visible}
      className={className}
      aria-label="modal-pop-up"
      onHide={() => setVisible(false)}
    >
      {children}
    </Dialog>
  );
}

export default Modal;
