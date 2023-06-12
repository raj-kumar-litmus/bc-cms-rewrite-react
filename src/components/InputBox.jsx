import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";

export default function InputBox({
  label,
  val,
  className,
  labelClassName,
  onChangeHandler,
  name
}) {
  return (
    <div>
      <span className="p-float-label">
        <InputText
          id={label}
          name={name}
          value={val}
          aria-label="input-box"
          className={className}
          onChange={onChangeHandler}
        />
        <label
          className={labelClassName || "!top-[22px] z-[1] bg-white"}
          htmlFor={label}
        >
          {label}
        </label>
      </span>
    </div>
  );
}
