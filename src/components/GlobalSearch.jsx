import React from "react";
import Button from "./Button";
import Textarea from "../components/InputTextarea";

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
    <div className="flex relative">
      <Textarea
      val={value}
      className={inputClasses}
      rows={4}
      cols={0}
      placeholder="Search by Style or Title or Brand"
      onChange={onChange}
      />
      {value && (
        <Button onClick={handleClear} className="absolute top-[36%] right-[14%]">
          <img
            className="h-[12px] w-[12px]"
            src={img}
            alt="NavBarSwitchingIcon SVG"
            data-testid="test-img"
          />
        </Button>
      )}
      <Button className={buttonClasses} onClick={onClick} disabled={!value}>
        {" "}
        {searchString}{" "}
      </Button>
    </div>
  );
}
export default GlobalSearch;
