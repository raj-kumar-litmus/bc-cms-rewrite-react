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
  const [searchCount, setSearchCount] = useState(false);
  const {
    searchByTitle,
    searchByStyle,
    setShowFilters,
    currentPage,
    setCustomers,
    setSelectedProducts,
    isAdmin,
    setLoader,
    setShowToast,
    selectedBrand,
    searchByStatus,
    searchByAssignee,
    searchByUpdatedAt,
    searchByUpdatedBy,
    setAppliedFilters,
    clearFilters,
    showTabs,
    setCurrentTab,
    setShowTabs,
    currentSort,
    styleSort,
    titleSort,
    brandSort,
    statusSort,
    updatedBySort,
    updatedAtSort,
    assigneeSort,
    setCurrentPage,
    setShowStyleFilter
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
    setAppliedFilters({});
  };

  const fetchBulkStyleSearch = async () => {
    var date = new Date(searchByUpdatedAt);
    const newDate = date.toDateString().split(" ");
    const finalDate = `${newDate[3]}-${newDate[1]}-${newDate[2]}`;
    const newSelectedBrand = selectedBrand.map((item) => item.brand);
    const status = [
      "WAITING_FOR_WRITER",
      "WRITING_COMPLETE",
      "EDITING_COMPLETE",
      "ASSIGNED_TO_WRITER",
      "ASSIGNED_TO_EDITOR",
      "WRITING_IN_PROGRESS",
      "EDITING_IN_PROGRESS"
    ];
    const body = {
      filters: {
        ...(search && {
          globalSearch: search?.replaceAll(" ", "")?.split(",")
        }),
        ...(searchByStyle && { styleId: searchByStyle }),
        ...(searchByTitle && { title: searchByTitle }),
        ...(newSelectedBrand.length && { brand: newSelectedBrand }),
        ...(searchByUpdatedBy && { lastUpdatedBy: searchByUpdatedBy }),
        ...(searchByAssignee && { assignee: searchByAssignee }),
        ...(searchByUpdatedAt && { lastUpdateTs: finalDate }),
        ...(searchByStatus.length && {
          status: searchByStatus.length ? [searchByStatus] : status
        })
      },
      orderBy: {
        ...(currentSort == "Style" && { styleId: styleSort }),
        ...(currentSort == "Title" && { title: titleSort }),
        ...(currentSort == "Brand" && { brand: brandSort }),
        ...(currentSort == "Updated By" && { lastUpdatedBy: updatedBySort }),
        ...(currentSort == "Assignee" && { assignee: assigneeSort }),
        ...(currentSort == "Status" && { status: statusSort }),
        ...((currentSort == "Updated At" ||
          (currentSort != "Style" &&
            currentSort != "Title" &&
            currentSort != "Brand" &&
            currentSort != "Updated By" &&
            currentSort != "Assignee" &&
            currentSort != "Status")) && { lastUpdateTs: updatedAtSort })
      }
    };
    try {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json"
        }
      };
      const response = await fetch(
        `${workFlowsUrl}/search?limit=10&page=${currentPage}`,
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

  const handleSearchChange = (e) => {
    const countOfEnteredSearch = e.target.value?.split(",").length
    setSearchCount(countOfEnteredSearch > 500 ? true : false);
    if (countOfEnteredSearch <= 500) {
      setSearch(e.target.value);
    }
  };

  const handleSearchClick = () => {
    clearFilters();
    setShowFilters(false);
    setShowTabs(false);
    setLoader(true);
    setShowStyleFilter(search?.split(",").length > 1 ? false : true);
  };

  const handleClear = () => {
    setShowTabs(true);
    setSearch("");
  };

  return (
    <>
      <div className="bg-white pb-[2%]">
        <div className="mx-[5%]">
          <StatusBarsForNormalization />
          <div className="mt-[3%]">
            <GlobalSearch
              onChange={handleSearchChange}
              onClick={handleSearchClick}
              handleClear={handleClear}
              img={ClearSearch}
              searchValue={search}
              searchString={"Search"}
              searchCount={searchCount}
              setSearchCount={setSearchCount}
              inputClasses={
                "!pr-[5%] !bg-white !text-[14px] !text-black !font-semibold w-full h-[64px] !pl-[2%] !pt-[18px] text-sm !placeholder-gray-20 !placeholder-opacity-1 !rounded !border !border-grey-30 !shadow"
              }
              buttonClasses={
                !search
                  ? "text-white bg-black bg-opacity-25 h-[64px] text-sm w-[10%] rounded ml-2"
                  : "text-white bg-black h-[64px] text-sm w-[10%] rounded ml-2"
              }
            />
          </div>
          <div className="mt-[3%]">
            {showTabs && (
              <WriterDashBoardTabs handleTabEvents={handleTabEvents} />
            )}
          </div>
          <div className="mt-[3%]">
            <Table
              search={search}
              fetchBulkStyleSearch={fetchBulkStyleSearch}
            />
          </div>
          <AssignStyle />
        </div>
      </div>
    </>
  );
}
export default NormalizationDashboard;
