import React from "react";
import Loader from "../components/loader";
function StatusBarTail({ img, title, count, className }) {
  return (
    <div className="bg-white rounded-[10px] border border-solid border-[#E0E3E5] flex flex-row  h-[123px] items-center pl-[16px] mt-[64px]">
      <div
        className={`${className} flex justify-center items-center rounded-full w-[50px] h-[50px] `}
      >
        <img className={"w-[18px] h-[18px]"} src={img} alt="Assigned SVG" />
      </div>
      <div className="mx-4">
        <p className="text-sm text-[#4D4D4D]">{title}</p>
        {count >= 0 ? (
          <h2 className="font-bold text-[#2C2C2C] text-[34px] w-[83px]">
            {count > 1000 ? `${count / 1000}K` : count}
          </h2>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
export default StatusBarTail;
