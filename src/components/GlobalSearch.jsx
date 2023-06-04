import React from "react";
import Button from "./Button";

function GlobalSearch({
  searchString,
  inputClasses,
  buttonClasses,
  onChange,
  onClick,
  value,
  handleClear,
  img
}) {
  return (
    <div className="flex">
      {value && (
        <Button onClick={handleClear}>
          <img
            className="h-[16px] w-[16px] absolute top-[0px] left-[908px]"
            src={img}
            alt="NavBarSwitchingIcon SVG"
          />
        </Button>
      )}
      <textarea
        value={value}
        className={inputClasses}
        rows="4"
        placeholder="Search by Style or Title or Brand"
        onChange={onChange}
      ></textarea>
      <Button className={buttonClasses} onClick={onClick} disabled={!value}>
        {" "}
        {searchString}{" "}
      </Button>
    </div>
  );
}
export default GlobalSearch;
