import React from "react";

function WordBetweenHorizontalLine({ text, lineColor }) {
  return (
    <section className="flex items-center">
      <div className={`flex-1 h-[1px] ${lineColor}`}></div>
      <div
        aria-label="text-between-lines"
        className="flex-wrap text-sm align-center ml-[15px] mr-[15px]"
      >
        {text}
      </div>
      <div className={`flex-1 h-[1px] ${lineColor}`}></div>
    </section>
  );
}

export default WordBetweenHorizontalLine;
