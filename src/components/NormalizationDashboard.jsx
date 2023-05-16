import React from "react";
import StatusBarsForNormalization from "./StatusBarsForNormalization.jsx";
import GlobalSearch from "./GlobalSearch.jsx";
import WriterDashBoardTabs from "./WriterDashBoardTabs.jsx";

function NormalizationDashboard() {
  return (
    <div className="bg-bg">
      <div className="m-2">
        <StatusBarsForNormalization />
      </div>
      <div className="m-10">
        <GlobalSearch searchString={"Search"} />
      </div>
      <div className="m-10">
        <WriterDashBoardTabs />
      </div>
    </div>
  );
}
export default NormalizationDashboard;
