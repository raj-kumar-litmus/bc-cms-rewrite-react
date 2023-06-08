import React from "react";
import Button from "./Button";
import Textarea from "../components/InputTextarea";
import Warning from '../logos/Warning.svg';

function GlobalSearch({
  searchString,
  inputClasses,
  buttonClasses,
  onChange,
  onClick,
  searchValue,
  handleClear,
  img,
  searchCount,
  setSearchCount
}) {
  const handleErrorClose=()=>{
    setSearchCount(false)
  }
  return (
    <>
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
          <Button
            onClick={handleClear}
            className="absolute top-[36%] right-[14%]"
          >
            <img
              className="h-[12px] w-[12px]"
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
      {searchCount &&<div
        className="flex items-center w-full p-4 bg-[#FC555619] text-grey-20 rounded shadow mt-2 border border-[#F95455] h-[75px]"
      >
        <div className="mr-2">
        <img
              className="h-[21px] w-[23px]"
              src={Warning}
              alt="close SVG"
            />
        </div>
        <div className="text-sm font-[14px] text-[#4D4D4D]">You have entered more than 500 styles. Please remove 501 styles</div>
        <div className="flex items-center ml-auto space-x-2">
        <Button
            onClick={handleErrorClose}
          >
            <img
              className="h-[12px] w-[12px]"
              src={img}
              alt="close SVG"
            />
          </Button>
        </div>
      </div>}
    </>
  );
}
export default GlobalSearch;
