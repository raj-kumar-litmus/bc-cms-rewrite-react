import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";

export default function Textarea({ label, val, className, labelClassName }) {
  const [value, setValue] = useState(val || "");

  return (
    <div>
      <span className="p-float-label">
        <InputTextarea
          id={label}
          aria-label="text-area"
          className={className}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={5}
          cols={30}
        />
        <label className={labelClassName} htmlFor={label}>
          {label}
        </label>
      </span>
    </div>
  );
}
