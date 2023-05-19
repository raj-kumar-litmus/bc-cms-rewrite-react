import React from "react";
import StatusBarsForNormalization from "./StatusBarsForNormalization.jsx";
import GlobalSearch from "./GlobalSearch.jsx";
import WriterDashBoardTabs from "./WriterDashBoardTabs.jsx";

function NormalizationDashboard() {
  return (
    <div className="bg-grey-40 h-screen">
      <div className="mx-[139px]">
        <StatusBarsForNormalization />
      <div className="mt-[40px]">
        <GlobalSearch searchString={"Search"} className="bg-white w-full h-[64px] items-center pl-[24px] text-sm placeholder-gray-20 rounded border border-grey-30 shadow" />
      </div>
      <div className="mt-[49px]">
        <WriterDashBoardTabs />
      </div>
      </div>
    </div>
  );
}
export default NormalizationDashboard;
