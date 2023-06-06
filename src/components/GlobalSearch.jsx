import React from "react";
import Button from "./Button";
import Textarea from "../components/InputTextarea";

function GlobalSearch({
  searchString,
  inputClasses,
  buttonClasses,
  onChange,
  onClick,
  searchValue,
  handleClear,
  img
}) {
  return (
    <div className="flex relative">
      <Textarea
        val={searchValue}
        className={inputClasses}
        rows={4}
        cols={0}
        placeholder="Search by Style or Title or Brand"
        onChange={onChange}
      />
      {searchValue && (
        <Button onClick={handleClear}>
          <img
            className="h-[16px] w-[16px] absolute top-[25%] right-[12%]"
            src={img}
            alt="NavBarSwitchingIcon SVG"
            data-testid="test-img"
          />
        </Button>
      )}
      <Button
        className={buttonClasses}
        onClick={onClick}
        disabled={!searchValue}
      >
        {" "}
        {searchString}{" "}
      </Button>
    </div>
  );
}
export default GlobalSearch;
