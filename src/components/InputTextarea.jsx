import React from "react";
import { InputTextarea } from "primereact/inputtextarea";

export default function Textarea({
  label,
  val,
  className,
  labelClassName,
  placeholder,
  onChange,
  rows,
  cols
}) {
  return (
    <div className="w-[90%]">
      <span>
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
