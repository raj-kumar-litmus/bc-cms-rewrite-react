import React from "react";
import StatusBarsForNormalization from "./StatusBarsForNormalization.jsx";
import GlobalSearch from "./GlobalSearch.jsx";
import WriterDashBoardTabs from "./WriterDashBoardTabs.jsx";

function NormalizationDashboard() {
  return (
    <div className="bg-grey-40 h-screen">
      <div className="mx-[139px]">
      <div>
        <StatusBarsForNormalization />
      </div>
      <div className="mt-[40px]">
        <GlobalSearch searchString={"Search"} />
      </div>
      <div className="mt-[49px]">
        <WriterDashBoardTabs />
      </div>
      </div>
    </div>
  );
}
export default NormalizationDashboard;
