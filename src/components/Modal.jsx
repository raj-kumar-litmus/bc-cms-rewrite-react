import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

function Modal({ visible, setVisible, className, children, header, footer }) {
  return (
    <Dialog
      header={header}
      footer={footer}
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
