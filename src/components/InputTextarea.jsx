import React from "react";
import { InputTextarea } from "primereact/inputtextarea";

export default function Textarea({
  label,
  val,
  className,
  labelClassName,
  containerClassName,
  placeholder,
  onChange,
  rows,
  cols
}) {
  return (
    <div className={containerClassName || "w-[90%]"}>
      <label
        className={
          labelClassName ||
          "relative text-[10px] !top-[10px] !left-[15px] z-1 bg-white"
        }
        htmlFor={label}
      >
        {label}
      </label>
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
    </div>
  );
}
