import React, { useEffect, useContext } from "react";
import { DashBoardContext } from "../context/normalizationDashboard.jsx";
import { useNavigate } from "react-router-dom";
import StatusBarsForNormalization from "./StatusBarsForNormalization.jsx";
import GlobalSearch from "./GlobalSearch.jsx";
import WriterDashBoardTabs from "./WriterDashBoardTabs.jsx";
import AssignStyle from "../pages/assignStyle.jsx";
import Table from "./Table.jsx";
import useSessionStorage from "../hooks/useSessionStorage";

function NormalizationDashboard() {
  const navigate = useNavigate();
  const [accountDetails] = useSessionStorage("accountDetails");

  const { setSelectedProducts, setCurrentTab, setCurrentPage, isAdmin } =
    useContext(DashBoardContext);

  useEffect(() => {
    setCurrentTab(isAdmin ? "Unassigned" : "Completed");
  }, [isAdmin]);

  useEffect(() => {
    if (!accountDetails?.idTokenClaims?.exp) {
      navigate("/");
    }
  }, [accountDetails]);

  const handleTabEvents = (tab) => {
    setCurrentPage(1);
    setCurrentTab(tab.target.innerText);
    setSelectedProducts([]);
  };

  return (
    <div className="bg-white pb-[20px]">
      <div className="mx-[5%]">
        <StatusBarsForNormalization />
        <div className="mt-[40px]">
          <GlobalSearch
            searchString={"Search"}
            inputClasses={
              "bg-white w-full h-[64px] items-center pl-[24px] text-sm placeholder-gray-20 placeholder-opacity-1 rounded border border-grey-30 shadow"
            }
            buttonClasses={
              "text-white bg-black h-[64px] text-sm w-[131px] rounded ml-2"
            }
          />
        </div>
        <div className="mt-[49px]">
          <WriterDashBoardTabs handleTabEvents={handleTabEvents} />
        </div>
        <div className="mt-[49px]">
          <Table />
        </div>
        <AssignStyle />
        <div className="m-10">
          {/* <GlobalSearch searchString={"Search"} /> */}
        </div>
      </div>
    </div>
  );
}
export default NormalizationDashboard;
