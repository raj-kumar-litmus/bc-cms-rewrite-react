import React, { useState, useEffect, useContext } from "react";
import { DashBoardContext } from "../context/normalizationDashboard.jsx";
import { useNavigate } from "react-router-dom";
import { workFlowsUrl } from "../constants/index";
import StatusBarsForNormalization from "./StatusBarsForNormalization.jsx";
import GlobalSearch from "./GlobalSearch.jsx";
import WriterDashBoardTabs from "./WriterDashBoardTabs.jsx";
import AssignStyle from "../pages/assignStyle.jsx";
import Table from "./Table.jsx";
import useSessionStorage from "../hooks/useSessionStorage";

function NormalizationDashboard() {
  const navigate = useNavigate();
  const [accountDetails] = useSessionStorage("accountDetails");
  const [search, setSearch] = useState("");
  const {
    setSelectedProducts,
    setCurrentTab,
    setCurrentPage,
    isAdmin,
    setCustomers,
    currentPage,
    setLoader,
    setShowToast
  } = useContext(DashBoardContext);

  useEffect(() => {
    setCurrentTab(isAdmin ? "Unassigned" : "Assigned");
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
    clearFilters()
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
      const data = await response.json();
      if (data?.success) {
        setCustomers(data?.data);
        setLoader(false);
      }
      if (!data?.success) {
        setLoader(false);
        setShowToast(true);
      }
    } catch (err) {
      setLoader(false);
      setShowToast(true);
    }
  };

  async function getGlobalSearch() {
    const response = await fetch(
      `${workFlowsUrl}/search?limit=10&page=${currentPage}&globalSearch=${search}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    );
    const data = await response.json();
    if (data?.success) {
      setCustomers(data?.data);
      setLoader(false);
    }
    if (!data?.success) {
      setLoader(false);
      setShowToast(true);
    }
  }

  const handleSearchClick = () => {
    setLoader(true);
    if (search.includes(",")) {
      fetchBulkStyleSearch();
    } else {
      getGlobalSearch();
    }
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
              value={search}
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
    </>
  );
}
export default NormalizationDashboard;
