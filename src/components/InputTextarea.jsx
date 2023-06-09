import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";

export default function Textarea({ label, val, className, labelClassName, placeholder, onChange, rows, cols }) {
  const [value, setValue] = useState(val || "");

  return (
    <div className="w-[90%]">
      <span className="p-float-label">
        <InputTextarea
          id={label}
          aria-label="text-area"
          className={className}
          value={val}
          onChange={onChange}
          rows={rows}
          cols={cols}
          placeholder={placeholder}
        />
        <label
          className={labelClassName || "!top-[2px] !left-[15px] z-1 bg-white"}
          htmlFor={label}
        >
          {label}
        </label>
      </span>
    </div>
  );
}
