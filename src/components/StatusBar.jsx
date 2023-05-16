import React from "react";
function StatusBarTail({ img, title, count, className }) {
  return (
    <div className="bg-white rounded-lg shadow flex flex-row m-10 w-15 h-15">
      <div className="mt-6 m-4">
        <img className={className} src={img} alt="Assigned SVG" />
      </div>
      <div className="m-3 mx-8">
        <p className="text-sm mr-8">{title}</p>
        <h2 className="font-bold text-xl">{count}</h2>
      </div>
    </div>
  );
}
export default StatusBarTail;
