import React, { useState } from "react";
import { InputText } from "primereact/inputtext";

export default function InputBox({ label, val, className, labelClassName }) {
  const [value, setValue] = useState(val || "");

  return (
    <div>
      <span className="p-float-label">
        <InputText
          id={label}
          value={value}
          aria-label="input-box"
          className={className}
          onChange={(e) => setValue(e.target.value)}
        />
        <label className={labelClassName} htmlFor={label}>
          {label}
        </label>
      </span>
    </div>
  );
}
