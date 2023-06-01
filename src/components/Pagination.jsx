import React, { useContext } from "react";
import { DashBoardContext } from "../context/normalizationDashboard";
import Button from "./Button";

function Pagination({ count, preText, nextText, className }) {
  const { currentPage, setCurrentPage } = useContext(DashBoardContext);
  const pages = Array.from(Array(count).keys(), (item) => item + 1);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber.target.innerText);
  };
  const onPrevClick = () => {
    if (currentPage > 1) setCurrentPage(parseInt(currentPage) - 1);
  };
  const onNextClick = () => {
    if (count > currentPage) {
      setCurrentPage(parseInt(currentPage) + 1);
    }
  };

  const ChevronLeft = ({ fill, className }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="10px"
      height="11.309"
      viewBox="0 0 6.404 11.309"
    >
      <path
        id="chevron-down"
        d="M0,0,4.594,4.594,9.188,0"
        transform="translate(5.344 1.061) rotate(90)"
        fill={"none"}
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );

  return (
    <div className="mt-3 mb-3">
      {pages.length > 0 && (
        <nav className="flex justify-center items-center">
          <Button
            disabled={currentPage == 1}
            className={`${className} ${currentPage == 1 && "text-gray-500"}`}
            onClick={onPrevClick}
          >
            <ChevronLeft fill={currentPage == 1 ? "#6E6E6E" : "#1c1c1c"} />
            {preText}
          </Button>
          {pages?.map((item) => (
            <Button
              key={item}
              className={`px-3 py-2 mr-2 border border-gray-300 ${
                item == currentPage
                  ? "text-white bg-black"
                  : "text-gray-500 bg-white"
              }`}
              onClick={onPageChange}
            >
              {item}
            </Button>
          ))}
          <Button
            className={`${className} ${
              currentPage > pages.length - 1 && "text-gray-500"
            }`}
            disabled={currentPage > pages.length - 1}
            onClick={onNextClick}
          >
            {nextText}
            <ChevronLeft
              className="rotate-180"
              fill={currentPage > pages.length - 1 ? "#6E6E6E" : "#1c1c1c"}
            />
          </Button>
        </nav>
      )}
    </div>
  );
}
export default Pagination;
