import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";
import { Toast } from "primereact/toast";
import RedCross from "../logos/red-cross-in-circle.svg";
import { DashBoardContext } from "../context/normalizationDashboard";
import "primereact/resources/themes/fluent-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";
import { workFlowsUrl, statusForUi } from "../constants/index";
import Pagination from "./Pagination";
import AssigneEdit from "../logos/AssigneEdit.svg";
import ReAssign from "../logos/ReAssign.svg";
import Edit from "../logos/Edit.svg";
import ArrowSort from "../logos/ArrowSort.svg";
import MoreIcons from "../logos/MoreIcons.svg";
import FilterIcon from "../logos/Filter.svg";
import CalendarIcon from "../logos/Calendar.svg";
import FilterIconBlack from "../logos/FilterIconBlack.svg";
import TableHeaders from "./TableHeaders";
import MoreIconPopUp from "./MoreIcon";
import Loader from "../components/loader";
import useSessionStorage from "../hooks/useSessionStorage";
import { status, limit } from "../constants/index";
import AssignToEditor from "../logos/AssignToEditor.svg";
import AssignToWriter from "../logos/AssignToWriter.svg";
import ArrowSortDownLine from "../logos/ArrowSortDownLine.svg";
import ArrowSortUpLine from "../logos/ArrowSortUpLine.svg";
import Clear from "../logos/ClearFilters.svg";
import { isAllEqual } from "../utils";

export default function Table() {
  const [brands, setBrands] = useState([]);
  const [assigneeList, setAssignee] = useState([]);
  const [statuses, setStatus] = useState([]);
  const [showEdit, setShowEdit] = useState(null);
  const [styleSort, setStyleSort] = useState("desc");
  const [titleSort, setTitleSort] = useState("desc");
  const [brandSort, setBrandSort] = useState("desc");
  const [statusSort, setStatusSort] = useState("desc");
  const [updatedBySort, setUpdatedBySort] = useState("desc");
  const [updatedAtSort, setUpdatedAtSort] = useState("desc");
  const [assigneeSort, setAssigneeSort] = useState("desc");
  const [currentSort, setCurrentSort] = useState("");
  const [isRowSelected, setIsRowSelected] = useState(false);
  const [isStatusSelected, setIsStatusSelected] = useState(false);
  const [canAssignOrReAssign, setCanAssignOrReAssign] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [tabChanged, setTabChanged] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [defaultSort, setDefaultSort] = useState(ArrowSort);
  const [userEmail] = useSessionStorage("userEmail");
  const navigate = useNavigate();
  const {
    setWorkflowId,
    setStyleId,
    searchByTitle,
    setSearchByTitle,
    searchByStyle,
    setSearchByStyle,
    showFilters,
    setShowFilters,
    setIsModalVisible,
    currentPage,
    setAssigneeType,
    customers,
    setCustomers,
    selectedProducts,
    setSelectedProducts,
    currentTab,
    isAdmin,
    isWriter,
    isEditor,
    loader,
    setLoader,
    showToast,
    setShowToast,
    clearAllFilters,
    selectedBrand,
    setSelectedBrand,
    searchByStatus,
    setSearchByStatus,
    searchByAssignee,
    setSearchByAssignee,
    searchByUpdatedAt,
    setsearchByUpdatedAt,
    debouncedTitle,
    setDebouncedTitle,
    debouncedStyle,
    setDebouncedStyle,
    debouncedUpdatedBy,
    setDebouncedUpdatedBy,
    searchByUpdatedBy,
    setsearchByUpdatedBy,
    clearFilters
  } = useContext(DashBoardContext);

  const toastBR = useRef(null);

  useEffect(() => {
    setTabChanged(true);
  }, [currentPage]);

  useEffect(() => {
    if (showFilters) {
      getBrands();
      getStatus();
    }
    if (showFilters && isAdmin) {
      getAssignee();
    }
  }, [showFilters]);

  const showTopCenter = () => {
    toastBR.current.show({
      severity: showToast ? "error" : "success",
      content: <Summary />,
      sticky: true
    });
  };

  const Summary = () => {
    return (
      <div className="flex">
        {showToast && <img src={RedCross} alt="RedCross" />}
        <div className="flex flex-col ml-[20px]">
          <p>{showToast && "Something went wrong !"}</p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (showToast) {
      showTopCenter();
    }
  }, [showToast]);

  async function getCustomers() {
    var date = new Date(searchByUpdatedAt);
    const newDate = date.toDateString().split(" ");
    const finalDate = `${newDate[3]}-${newDate[1]}-${newDate[2]}`;
    const newSelectedBrand = selectedBrand.map((item) => item.brand);
    const status = [];
    switch (currentTab) {
      case "Unassigned":
        status.push("WAITING_FOR_WRITER");
        break;
      case "Completed":
        status.push("WRITING_COMPLETE", "EDITING_COMPLETE");
        break;
      case "Assigned":
        status.push("ASSIGNED_TO_WRITER", "ASSIGNED_TO_EDITOR");
        break;
      case "In Progress":
        status.push("WRITING_IN_PROGRESS", "EDITING_IN_PROGRESS");
        break;
      default:
        return;
    }
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
        status: searchByStatus.length ? [searchByStatus] : status
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
        `${workFlowsUrl}/search?limit=10&page=${currentPage}`,
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

  async function getBrands() {
    const response = await fetch(
      `${workFlowsUrl}/search?limit=${limit}&page=${currentPage}&unique=brand`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    );
    const data = await response.json();
    if (data?.success) {
      setBrands(
        data?.data?.uniqueValues
          .filter(Boolean)
          .map((item) => ({ brand: item }))
      );
    }
    if (!data?.success) {
      setShowToast(true);
    }
  }

  async function getStatus() {
    const status = [];
    switch (currentTab) {
      case "Unassigned":
        status.push("WAITING_FOR_WRITER");
        break;
      case "Completed":
        status.push("WRITING_COMPLETE", "EDITING_COMPLETE");
        break;
      case "Assigned":
        status.push("ASSIGNED_TO_WRITER", "ASSIGNED_TO_EDITOR");
        break;
      case "In Progress":
        status.push("WRITING_IN_PROGRESS", "EDITING_IN_PROGRESS");
        break;
      default:
        status;
    }
    const body = {
      filters: { status }
    };
    const response = await fetch(
      `${workFlowsUrl}/search?limit=10&page=${currentPage}&unique=status`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    );
    const data = await response.json();
    if (data?.success) {
      setStatus(data?.data?.uniqueValues);
    }
    if (!data?.success) {
      setShowToast(true);
    }
  }

  async function getAssignee() {
    const response = await fetch(
      `${workFlowsUrl}/search?limit=${limit}&page=${currentPage}&unique=assignee`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    );
    const data = await response.json();
    if (data?.success) {
      setAssignee(data?.data?.uniqueValues.filter(Boolean));
    }
    if (!data?.success) {
      setShowToast(true);
    }
  }

  useEffect(() => {
    setLoader(true);
    getCustomers();
  }, [
    searchByStyle,
    searchByTitle,
    selectedBrand,
    searchByStatus,
    searchByAssignee,
    searchByUpdatedBy,
    searchByUpdatedAt,
    styleSort,
    titleSort,
    brandSort,
    statusSort,
    updatedBySort,
    updatedAtSort,
    assigneeSort,
    currentTab,
    currentPage,
    isStatusSelected,
    clearAllFilters
  ]);

  useEffect(() => {
    if (customers?.pagination) {
      setPageCount(customers?.pagination?.pageCount);
    }
  }, [customers]);

  const handleStyleChanges = (e) => {
    setDebouncedStyle(e.target.value);
    setTimeout(() => {
      setSearchByStyle(e.target.value);
    }, 1000);
  };

  const handleTitleChange = (e) => {
    setDebouncedTitle(e.target.value);
    setTimeout(() => {
      setSearchByTitle(e.target.value);
    }, 2000);
  };

  const handleUpdatedByChange = (e) => {
    setDebouncedUpdatedBy(e.target.value);
    setTimeout(() => {
      setsearchByUpdatedBy(e.target.value);
    }, 1000);
  };
  useEffect(() => {
    setCanAssignOrReAssign(isAllEqual(selectedProducts.map((e) => e.status)));
  }, [selectedProducts]);

  useEffect(() => {
    if (canAssignOrReAssign && selectedProducts.length > 1) {
      if (
        [
          status.assignedToWriter,
          status.waitingForWriter,
          status.writingInProgress
        ].includes(selectedProducts?.[0]?.status)
      ) {
        setAssigneeType("writers");
      }
      if (
        [status.assignedToEditor, status.editingInProgress].includes(
          selectedProducts[0].status
        )
      ) {
        setAssigneeType("editors");
      }
      setWorkflowId(selectedProducts.map((e) => e.id));
    }
  }, [canAssignOrReAssign, selectedProducts]);

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end gap-4">
        {selectedProducts.length > 1 && canAssignOrReAssign && (
          <>
            {currentTab == "Completed" && (
              <button
                className="flex"
                onClick={() => {
                  setAssigneeType("writers");
                  setStyleId(selectedProducts.map((e) => e?.styleId));
                  setIsModalVisible(true);
                }}
              >
                <span className="bg-white flex rounded-full justify-center items-center border w-[32px] h-[32px] border-grey-30 mr-1">
                  <img
                    alt={`AssignToWriter svg`}
                    src={AssignToWriter}
                    className="w-[15px] h-[15px]"
                  />
                </span>
                <span className="text-sm text-[#2C2C2C] font-semibold text-opacity-1">
                  Assign To Writer
                </span>
              </button>
            )}

            {currentTab == "Completed" && (
              <button
                className="flex"
                onClick={() => {
                  setAssigneeType("editors");
                  setStyleId(selectedProducts.map((e) => e?.styleId));
                  setIsModalVisible(true);
                }}
              >
                <span className="bg-white flex rounded-full justify-center items-center border w-[30px] h-[30px] border-grey-30 mr-1">
                  <img
                    alt={`AssignToEditor svg`}
                    src={AssignToEditor}
                    className="w-[15px] h-[15px]"
                  />
                </span>
                <span className="text-sm text-[#2C2C2C] font-semibold text-opacity-1">
                  Assign To Editor
                </span>
              </button>
            )}

            {currentTab == "Unassigned" && (
              <button
                className="flex"
                onClick={() => {
                  setStyleId(selectedProducts.map((e) => e?.styleId));
                  setIsModalVisible(true);
                }}
              >
                <span className="bg-white flex rounded-full justify-center items-center border w-[32px] h-[32px] border-grey-30 mr-1">
                  <img
                    alt={`AssigneEdit svg`}
                    src={AssigneEdit}
                    className="w-[15px] h-[15px]"
                  />
                </span>
                <span className="text-sm text-[#2C2C2C] font-semibold text-opacity-1">
                  Assign
                </span>
              </button>
            )}

            {(currentTab == "Assigned" || currentTab == "InProgress") && (
              <button
                className="flex"
                onClick={() => {
                  setStyleId(selectedProducts.map((e) => e?.styleId));
                  setIsModalVisible(true);
                }}
              >
                <span className="bg-white flex rounded-full justify-center items-center border w-[32px] h-[32px] border-grey-30 mr-1">
                  <img
                    alt={`ReAssign svg`}
                    src={ReAssign}
                    className="w-[15px] h-[15px]"
                  />
                </span>
                <span className="text-sm text-[#2C2C2C] font-semibold text-opacity-1">
                  Reassign
                </span>
              </button>
            )}
          </>
        )}
      </div>
    );
  };

  const representativesItemTemplate = (option) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{option.brand}</span>
      </div>
    );
  };

  const statusItemTemplate = (option) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{option}</span>
      </div>
    );
  };

  const handleBrands = (value) => {
    setSelectedBrand(value);
  };

  const statusRowFilterTemplate = () => {
    return (
      <Dropdown
        style={{ width: "185px" }}
        value={searchByStatus}
        options={statuses}
        onChange={handleStatus}
        itemTemplate={statusItemTemplate}
        placeholder="Select"
      />
    );
  };

  const assigneeRowFilterTemplate = () => {
    return (
      <MultiSelect
        value={searchByAssignee}
        showSelectAll={false}
        options={assigneeList}
        itemTemplate={statusItemTemplate}
        onChange={handleAssign}
        showClear={false}
        optionLabel="Assignee"
        placeholder="Select"
        filter
        maxSelectedLabels={0}
      />
    );
  };

  const handleAssign = (e) => {
    setSearchByAssignee(e.target.value);
  };

  const handleStatus = (e) => {
    setIsStatusSelected(true);
    setSearchByStatus(e.target.value);
  };

  const titleRowFilterTemplate = () => {
    return (
      <span className="p-input-icon-left w-[100%] min-w-[80px]">
        <i className="pi pi-search" />
        <InputText value={debouncedTitle} onChange={handleTitleChange} />
      </span>
    );
  };

  const brandRowFilterTemplate = () => {
    return (
      <div>
        <MultiSelect
          value={selectedBrand}
          showSelectAll={false}
          options={brands}
          itemTemplate={representativesItemTemplate}
          onChange={(e) => handleBrands(e.value)}
          optionLabel="brand"
          placeholder="Select"
          filter
          maxSelectedLabels={1}
          style={{ width: "100px" }}
        />
      </div>
    );
  };

  const updatedByFilterTemplate = () => {
    return (
      <span className="p-input-icon-left w-[100%] min-w-[80px]">
        <i className="pi pi-search" />
        <InputText
          value={debouncedUpdatedBy}
          onChange={handleUpdatedByChange}
        />
      </span>
    );
  };

  const styleRowFilterTemplate = () => {
    return (
      <span className="p-input-icon-left w-[100%] min-w-[80px]">
        <i className="pi pi-search" />
        <InputText value={debouncedStyle} onChange={handleStyleChanges} />
      </span>
    );
  };

  const dateFilterTemplate = () => {
    return (
      <span className="w-[100%] relative">
        {!searchByUpdatedAt && (
          <img
            alt={`${CalendarIcon} svg`}
            src={CalendarIcon}
            className="absolute right-2 top-4 z-10"
          />
        )}
        <Calendar
          value={searchByUpdatedAt}
          onChange={handleCalanderChange}
          className={Boolean && "p-calendar p-component p-inputwrapper"}
          style={{ minWidth: "60px" }}
        />
      </span>
    );
  };

  const handleCalanderChange = (e) => {
    setsearchByUpdatedAt(e.target.value);
  };

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.lastUpdateTs);
  };

  const formatDate = (value) => {
    var date = new Date(value);
    const newDate = date.toDateString().split(" ");
    const finalDate = `${newDate[0]} ${newDate[2]} ${newDate[1]}`;
    return finalDate;
  };

  const setFilters = () => {
    setShowFilters(true);
    setTabChanged(!tabChanged);
  };

  const handleFilterIcon = () => {
    return (
      <span>
        <button onClick={setFilters}>
          {showFilters && !tabChanged ? (
            <div className="bg-black text-white text-sm rounded-full border h-8 w-8 flex justify-center items-center">
              <img alt={`${FilterIcon} svg`} src={FilterIcon} />
            </div>
          ) : (
            <div className="bg-white text-black text-sm rounded-full border h-8 w-8 flex justify-center items-center">
              <img alt={`${FilterIconBlack} svg`} src={FilterIconBlack} />
            </div>
          )}
        </button>
      </span>
    );
  };
  const filterHeader = () => {
    return (
      <span>
        {(selectedBrand.length ||
          searchByStatus.length ||
          searchByAssignee ||
          searchByTitle ||
          searchByStyle ||
          searchByUpdatedBy ||
          searchByUpdatedAt != null) && (
          <button onClick={clearFilters}>
            <div className="flex">
              <img alt={`${Clear} svg`} src={Clear} />
              <span className="ml-[5px] text-sm text-[#2C2C2C] font-semibold text-opacity-1">
                Clear
              </span>
            </div>
          </button>
        )}
      </span>
    );
  };

  const handleSort = (currentSort) => {
    setCurrentSort(currentSort);
    switch (currentSort) {
      case "Style":
        setStyleSort(styleSort == "desc" ? "asc" : "desc");
        setDefaultSort(
          styleSort == "desc" ? ArrowSortDownLine : ArrowSortUpLine
        );
        break;
      case "Title":
        setTitleSort(titleSort == "desc" ? "asc" : "desc");
        setDefaultSort(
          titleSort == "desc" ? ArrowSortDownLine : ArrowSortUpLine
        );
        break;
      case "Brand":
        setBrandSort(brandSort == "desc" ? "asc" : "desc");
        setDefaultSort(
          brandSort == "desc" ? ArrowSortDownLine : ArrowSortUpLine
        );
        break;
      case "Status":
        setStatusSort(statusSort == "desc" ? "asc" : "desc");
        setDefaultSort(
          statusSort == "desc" ? ArrowSortDownLine : ArrowSortUpLine
        );
        break;
      case "Assignee":
        setAssigneeSort(assigneeSort == "desc" ? "asc" : "desc");
        setDefaultSort(
          assigneeSort == "desc" ? ArrowSortDownLine : ArrowSortUpLine
        );
        break;
      case "Updated By":
        setUpdatedBySort(updatedBySort == "desc" ? "asc" : "desc");
        setDefaultSort(
          updatedBySort == "desc" ? ArrowSortDownLine : ArrowSortUpLine
        );
        break;
      case "Updated At":
        setUpdatedAtSort(updatedAtSort == "desc" ? "asc" : "desc");
        setDefaultSort(
          updatedAtSort == "desc" ? ArrowSortDownLine : ArrowSortUpLine
        );
        break;
      default:
        break;
    }
  };

  const iconClickHandler = (e, type, rowData) => {
    if (type === "edit") {
      navigate("/styleDetails", {
        state: {
          quickFix: true,
          styleId: rowData?.styleId
        }
      });
    }
    if (type === "assign") {
      if (
        [
          status.assignedToWriter,
          status.waitingForWriter,
          status.writingInProgress
        ].includes(rowData.status)
      ) {
        setAssigneeType("writers");
      }
      if (
        [status.assignedToEditor, status.editingInProgress].includes(
          rowData.status
        )
      ) {
        setAssigneeType("editors");
      }
      setIsModalVisible(true);
      setStyleId([rowData?.styleId]);
      setWorkflowId([rowData?.id]);
    }
    e.stopPropagation();
  };

  const handleRowSelectIcons = (rowData, type) => {
    return (
      <div
        onClick={(e) => iconClickHandler(e, type, rowData)}
        className={`${
          rowData.id == showEdit &&
          isRowSelected &&
          isAdmin &&
          selectedProducts.length < 2
            ? "flex"
            : "invisible"
        } justify-content-end`}
      >
        <span>
          {type == "edit" ? (
            <button
              className="bg-white flex rounded-full justify-center items-center border border-grey-30  h-[30px] w-[30px]"
              onClick={handleEditIcon}
            >
              <Tooltip target=".quick-fix" />
              <img
                alt={`${Edit} svg`}
                src={Edit}
                data-pr-tooltip="Quick Fix"
                data-pr-position="top"
                className="quick-fix"
              ></img>
            </button>
          ) : (
            <button
              className="bg-white flex rounded-full justify-center items-center border border-grey-30  h-[30px] w-[30px]"
              onClick={handleEditIcon}
            >
              <Tooltip target=".assign" />
              <img
                alt={`${
                  currentTab == "Assigned" || currentTab == "In Progress"
                    ? ReAssign
                    : AssigneEdit
                } svg`}
                src={
                  currentTab == "Assigned" || currentTab == "In Progress"
                    ? ReAssign
                    : AssigneEdit
                }
                data-pr-tooltip={
                  currentTab == "Assigned" || currentTab == "In Progress"
                    ? "Reassign"
                    : "Assign"
                }
                data-pr-position="top"
                className="assign"
              />
            </button>
          )}
        </span>
      </div>
    );
  };

  const handleMoreIconClick = () => {
    setShowPopup(true);
  };

  const handleMoreIcon = (rowData) => {
    return (
      <div className="relative">
        <div
          className={`${
            rowData.id == showEdit &&
            isRowSelected &&
            isAdmin &&
            selectedProducts.length < 2
              ? "flex"
              : "invisible"
          } justify-content-end relative`}
        >
          <span>
            <button onClick={handleMoreIconClick}>
              <span className="bg-white flex rounded-full justify-center items-center border border-grey-30  h-[30px] w-[30px]">
                <img alt={`${MoreIcons} svg`} src={MoreIcons} />
              </span>
            </button>
          </span>

          {rowData.id == showEdit && showPopup && (
            <div className="absolute top-0 right-0">
              <MoreIconPopUp rowData={rowData} />
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleEditIcon = () => {
    // code for edit icon show go in this
  };

  const pagination = () => {
    return pageCount > 1 ? (
      <Pagination
        count={pageCount}
        preText={"Prev"}
        nextText={"Next"}
        className={
          "flex items-center gap-[10%] px-3 py-2 mr-2 leading-tight text-[#2C2C2C] bg-white"
        }
      />
    ) : null;
  };

  const onSelectionChange = (event) => {
    const value = event.value;
    setSelectedProducts(value);
  };

  const onRowClick = ({ data }) => {
    // On admin dashboard, if click on the row is not on the checkbox then navigate to styleDetails.
    if (userEmail === data.assignee) {
      navigate("/styleDetails", {
        state: {
          quickFix: false,
          styleId: data?.styleId
        }
      });
    }
  };

  const onRowSelect = (e) => {
    setIsRowSelected(true);
    setShowEdit(e.data.id);
  };

  const onRowUnselect = () => {
    setIsRowSelected(false);
    setShowPopup(false);
  };

  return (
    <>
      <div className="mb-[4px]">{renderHeader()}</div>
      <div
        className={`${loader ? "border-0" : "border"} border-grey-30 text-sx`}
      >
        {loader && <Loader className={`h-full`} />}
        {!loader && (
          <DataTable
            value={customers?.workflows}
            dataKey="id"
            rows={100}
            selection={selectedProducts}
            filterDisplay={showFilters && !tabChanged && "row"}
            onRowMouseEnter={onRowSelect}
            onRowMouseLeave={onRowUnselect}
            footer={pagination}
            onSelectionChange={onSelectionChange}
            emptyMessage={
              <p className="m-auto w-[200px] font-bold text-lg">
                No Workflows found
              </p>
            }
            onRowClick={onRowClick}
          >
            {isAdmin && <Column selectionMode="multiple"></Column>}
            <Column
              field="styleId"
              header={
                <TableHeaders
                  headerName={"Style"}
                  sortIcon={defaultSort}
                  onClick={() => handleSort("Style")}
                  currentSort={currentSort}
                  ArrowSort={ArrowSort}
                />
              }
              filter
              showFilterMenu={false}
              filterElement={styleRowFilterTemplate}
              filterPlaceholder="Search by Style"
            />
            <Column
              field="title"
              header={
                <TableHeaders
                  headerName={"Title"}
                  sortIcon={defaultSort}
                  onClick={() => handleSort("Title")}
                  currentSort={currentSort}
                  ArrowSort={ArrowSort}
                />
              }
              filter
              filterElement={titleRowFilterTemplate}
              showFilterMenu={false}
              filterPlaceholder="Search by Title"
            />
            <Column
              header={
                <TableHeaders
                  headerName={"Brand"}
                  sortIcon={defaultSort}
                  onClick={() => handleSort("Brand")}
                  currentSort={currentSort}
                  ArrowSort={ArrowSort}
                />
              }
              field="brand"
              showFilterMenu={false}
              filter
              filterElement={brandRowFilterTemplate}
            />
            {isAdmin && currentTab !== "Unassigned" && (
              <Column
                field="statusForUi"
                header={
                  <TableHeaders
                    headerName={"Status"}
                    sortIcon={defaultSort}
                    onClick={() => handleSort("Status")}
                    currentSort={currentSort}
                    ArrowSort={ArrowSort}
                  />
                }
                showFilterMenu={false}
                filter
                filterElement={statusRowFilterTemplate}
              />
            )}
            {isEditor && (
              <Column
                field="statusForUi"
                header={
                  <TableHeaders
                    headerName={"Status"}
                    sortIcon={defaultSort}
                    onClick={() => handleSort("Status")}
                    currentSort={currentSort}
                    ArrowSort={ArrowSort}
                  />
                }
                showFilterMenu={false}
                filter
                filterElement={statusRowFilterTemplate}
              />
            )}
            {isWriter && currentTab !== "Assigned" && (
              <Column
                field="statusForUi"
                header={
                  <TableHeaders
                    headerName={"Status"}
                    sortIcon={defaultSort}
                    onClick={() => handleSort("Status")}
                    currentSort={currentSort}
                    ArrowSort={ArrowSort}
                  />
                }
                showFilterMenu={false}
                filter
                filterElement={statusRowFilterTemplate}
              />
            )}
            {currentTab !== "Completed" &&
              currentTab !== "Unassigned" &&
              isAdmin && (
                <Column
                  field="nameWithoutDomain"
                  header={
                    <TableHeaders
                      headerName={"Assignee"}
                      sortIcon={defaultSort}
                      onClick={() => handleSort("Assignee")}
                      currentSort={currentSort}
                      ArrowSort={ArrowSort}
                    />
                  }
                  showFilterMenu={false}
                  filter
                  filterElement={assigneeRowFilterTemplate}
                />
              )}
            <Column
              field="lastUpdatedByWithoutDomain"
              header={
                <TableHeaders
                  headerName={"Updated By"}
                  sortIcon={defaultSort}
                  onClick={() => handleSort("Updated By")}
                  currentSort={currentSort}
                  ArrowSort={ArrowSort}
                />
              }
              filter
              showFilterMenu={false}
              filterElement={updatedByFilterTemplate}
            />
            <Column
              field="lastUpdateTs"
              header={
                <TableHeaders
                  headerName={"Updated At"}
                  sortIcon={defaultSort}
                  onClick={() => handleSort("Updated At")}
                  currentSort={currentSort}
                  ArrowSort={ArrowSort}
                />
              }
              dataType="date"
              filter
              showFilterMenu={false}
              body={dateBodyTemplate}
              filterElement={dateFilterTemplate}
            />
            <Column body={(e) => handleRowSelectIcons(e, "edit")} />
            {currentTab !== "Completed" && (
              <Column
                header={handleFilterIcon}
                body={(e) => handleRowSelectIcons(e, "assign")}
              />
            )}
            {currentTab === "Completed" && (
              <Column header={handleFilterIcon} body={handleMoreIcon} />
            )}
          </DataTable>
        )}
      </div>
      <Toast ref={toastBR} position="top-center" />
    </>
  );
}
