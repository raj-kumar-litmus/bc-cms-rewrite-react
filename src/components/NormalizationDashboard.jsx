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
    searchByTitle,
    searchByStyle,
    setShowFilters,
    currentPage,
    setCustomers,
    setSelectedProducts,
    currentTab,
    isAdmin,
    setLoader,
    setShowToast,
    selectedBrand,
    searchByStatus,
    searchByAssignee,
    searchByUpdatedAt,
    searchByUpdatedBy,
    showTabs,
    clearFilters,
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
    setCurrentPage
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
    console.log("searchByStatus>>", searchByStatus);
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
        styleId: search.replaceAll(" ", "").split(","),
        ...(searchByTitle && { title: searchByTitle }),
        ...(newSelectedBrand.length && { brand: newSelectedBrand }),
        ...(searchByUpdatedBy && { lastUpdatedBy: searchByUpdatedBy }),
        ...((searchByAssignee || !isAdmin) && {
          assignee: !isAdmin ? userEmail : searchByAssignee
        }),
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
        ...(searchByStyle && { styleId: searchByStyle }),
        ...(searchByTitle && { title: searchByTitle }),
        ...(newSelectedBrand.length && { brand: newSelectedBrand }),
        ...(searchByUpdatedBy && { lastUpdatedBy: searchByUpdatedBy }),
        ...((searchByAssignee || !isAdmin) && {
          assignee: !isAdmin ? userEmail : searchByAssignee
        }),
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
      const response = await fetch(
        `${workFlowsUrl}/search?limit=10&page=${currentPage}&globalSearch=${
          search && search
        }`,
        {
          method: "POST",
          body: JSON.stringify(body),
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
    setShowFilters(false);
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
              inputClasses={
                "!pr-[5%] !bg-white !text-[14px] !text-black !font-semibold w-full h-[64px] !pl-[2%] !pt-[18px] text-sm !placeholder-gray-20 !placeholder-opacity-1 !rounded !border !border-grey-30 !shadow"
              }
              buttonClasses={
                !search ? "text-white bg-stone-300 h-[64px] text-sm w-[10%] rounded ml-2": "text-white bg-black h-[64px] text-sm w-[10%] rounded ml-2"
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
              getGlobalSearch={getGlobalSearch}
            />
          </div>
          <AssignStyle />
        </div>
      </div>
    </>
  );
}
export default NormalizationDashboard;
