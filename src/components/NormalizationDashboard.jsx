import React, { useState, useEffect, useContext } from "react";
import { DashBoardContext } from "../context/normalizationDashboard.jsx";
import { useNavigate } from "react-router-dom";
import { workFlowsUrl, statusForUi } from "../constants/index";
import StatusBarsForNormalization from "./StatusBarsForNormalization.jsx";
import GlobalSearch from "./GlobalSearch.jsx";
import WriterDashBoardTabs from "./WriterDashBoardTabs.jsx";
import AssignStyle from "../pages/assignStyle.jsx";
import Table from "./Table.jsx";
import useSessionStorage from "../hooks/useSessionStorage";
import ClearSearch from "../logos/ClearSearch.svg";

function NormalizationDashboard() {
  const navigate = useNavigate();
  const [accountDetails] = useSessionStorage("accountDetails");
  const [search, setSearch] = useState("");
  const {
    setSelectedProducts,
    setShowFilters,
    setCurrentTab,
    setCurrentPage,
    isAdmin,
    setCustomers,
    currentPage,
    setLoader,
    setShowToast,
    clearFilters,
    showTabs,
    setShowTabs
  } = useContext(DashBoardContext);

  useEffect(() => {
    if (isAdmin !== "default") {
      setCurrentTab(isAdmin ? "Unassigned" : "Assigned");
    }
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
    clearFilters();
    setShowFilters(false);
  };

  const fetchBulkStyleSearch = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          filters: {
            styleId: search.replaceAll(" ", "").split(",")
          },
          orderBy: {
            styleId: "desc"
          }
        })
      };
      const response = await fetch(
        `${workFlowsUrl}/search?limit=10&page=1`,
        requestOptions
      );
      if (response?.ok) {
        const data = await response.json();
        if (data?.data?.workflows) {
          data.data.workflows = data?.data.workflows.map((e) => ({
            ...e,
            statusForUi: statusForUi[e?.status],
            lastUpdatedByWithoutDomain: e?.lastUpdatedBy?.split("@")[0],
            nameWithoutDomain: e?.assignee?.split("@")[0]
          }));
        }
        setCustomers(data?.data);
        setLoader(false);
      } else {
        setLoader(false);
        setShowToast(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function getGlobalSearch() {
    try {
      const response = await fetch(
        `${workFlowsUrl}/search?limit=10&page=${currentPage}&globalSearch=${
          search && search
        }`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
      );
      if (response?.ok) {
        const data = await response.json();
        if (data?.data?.workflows) {
          data.data.workflows = data?.data.workflows.map((e) => ({
            ...e,
            statusForUi: statusForUi[e?.status],
            lastUpdatedByWithoutDomain: e?.lastUpdatedBy?.split("@")[0],
            nameWithoutDomain: e?.assignee?.split("@")[0]
          }));
        }
        setCustomers(data?.data);
        setLoader(false);
      } else {
        setLoader(false);
        setShowToast(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearchClick = () => {
    setShowTabs(false);
    setLoader(true);
    if (search.includes(",")) {
      fetchBulkStyleSearch();
    } else {
      getGlobalSearch();
    }
  };

  const handleClear = () => {
    setShowTabs(true);
    setSearch("");
  };

  return (
    <>
      <div className="bg-white pb-[20px]">
        <div className="mx-[5%]">
          <StatusBarsForNormalization />
          <div className="mt-[40px]">
            <GlobalSearch
              onChange={handleSearchChange}
              onClick={handleSearchClick}
              handleClear={handleClear}
              img={ClearSearch}
              value={search}
              searchString={"Search"}
              inputClasses={
                "bg-white text-[#4D4D4D] font-bold relative w-full h-[64px] pl-[26px] pt-[18px] text-sm placeholder-gray-20 placeholder-opacity-1 rounded border border-grey-30 shadow"
              }
              buttonClasses={
                "text-white bg-black h-[64px] text-sm w-[131px] rounded ml-2"
              }
            />
          </div>
          <div className="mt-[49px]">
            {showTabs && (
              <WriterDashBoardTabs handleTabEvents={handleTabEvents} />
            )}
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
    </>
  );
}
export default NormalizationDashboard;
