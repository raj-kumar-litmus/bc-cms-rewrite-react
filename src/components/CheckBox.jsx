import React from "react";

export default function CheckBox({ value, onChange, text, inputClassName }) {
  return (
    <div className="flex">
      <input
        className={inputClassName}
        checked={value}
        type="checkbox"
        onChange={onChange}
      />
      <p className="ml-[10px]">{text}</p>
    </div>
  );
}
