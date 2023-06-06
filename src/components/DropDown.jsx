import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import DownIcon from "../logos/chevron-down-1.svg";

//todo. to be removed later.
const defaultOptions = [
  { label: "Grapes", value: "grapes" },
  { label: "Mango", value: "mango" },
  { value: "purple", label: "Purple" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "pink", label: "Pink" },
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "gray", label: "Gray" },
  { label: "Strawberry", value: "strawberry", disabled: true }
];

const CloseButton = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10.247"
    height="10.247"
    viewBox="0 0 10.247 10.247"
  >
    <path
      id="Size_32_Theme_Regular"
      data-name="Size=32, Theme=Regular"
      d="M13.518,4.125a.427.427,0,0,1,.6.6L9.727,9.123l4.394,4.394a.427.427,0,0,1-.6.6L9.123,9.727,4.729,14.122a.427.427,0,0,1-.6-.6L8.52,9.123,4.125,4.729a.427.427,0,0,1,.6-.6L9.123,8.519Z"
      transform="translate(-4 -4)"
      fill="#8d8d8d"
    />
  </svg>
);

const MultiSelectDropDown = ({
  label,
  placeholder,
  options,
  defaultValues,
  labelClassName,
  className
}) => {
  const [selected, setSelected] = useState(defaultValues || []);
  const customValueRenderer = (selected) => {
    return selected.length
      ? selected.map(({ label }, index) =>
          index === selected.length - 1 ? label : `${label}, `
        )
      : placeholder;
  };

  return (
    <div>
      <p className={labelClassName}>{label}</p>
      <MultiSelect
        options={options || defaultOptions}
        labelledBy="dropdown"
        className={`custom-drop-down ${className}`}
        value={selected}
        onChange={setSelected}
        ClearSelectedIcon={CloseButton}
        ArrowRenderer={() => (
          <img className="px-1 py-1 h-31 w-31" src={DownIcon} />
        )}
        valueRenderer={customValueRenderer}
      />
    </div>
  );
};

export default MultiSelectDropDown;
