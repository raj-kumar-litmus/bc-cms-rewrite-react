import React from "react";
import Loader from '../components/loader'
function StatusBarTail({ img, title, count, className }) {
  return (
    <div className="bg-white rounded-lg shadow flex flex-row w-[260px] h-[123px] items-center pl-[25px] mt-[64px]">
    <div className={`${className} flex justify-center items-center rounded-full w-[50px] h-[50px] `}>
        <img className={"w-[18px] h-[18px]"} src={img} alt="Assigned SVG" />
    </div>
    <div className="m-3 mx-8">
        <p className="text-sm">{title}</p>
        {count ?
        <h2 className="font-bold text-[34px] w-[60px]">{`${(count)/1000}K`}</h2>
        : <Loader/>}
    </div>
</div>
  );
}
export default StatusBarTail;
