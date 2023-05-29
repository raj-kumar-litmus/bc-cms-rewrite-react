import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
import { workFlowsUrl } from "../constants/index";
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
import { status } from "../constants/index";
import AssignToEditor from "../logos/AssignToEditor.svg";
import AssignToWriter from "../logos/AssignToWriter.svg";
import ArrowSortDownLine from "../logos/ArrowSortDownLine.svg";
import ArrowSortUpLine from "../logos/ArrowSortUpLine.svg";

export default function Table() {
  const [searchByStyle, setSearchByStyle] = useState("");
  const [searchByTitle, setSearchByTitle] = useState("");
  const [searchByStatus, setSearchByStatus] = useState([]);
  const [searchByAssignee, setSearchByAssignee] = useState("");
  const [searchByUpdatedBy, setsearchByUpdatedBy] = useState("");
  const [searchByUpdatedAt, setsearchByUpdatedAt] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
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
  const [showPopup, setShowPopup] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [defaultSort, setDefaultSort] = useState(ArrowSort);
  const [userEmail] = useSessionStorage("userEmail");
  const navigate = useNavigate();
  const {
    setWorkflowId,
    setStyleId,
    setIsModalVisible,
    currentPage,
    setAssigneeType,
    customers,
    setCustomers,
    selectedProducts,
    setSelectedProducts,
    currentTab,
    isAdmin,
    loader,
    setLoader
  } = useContext(DashBoardContext);

  useEffect(() => {
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
      case "InProgress":
        status.push("WRITING_IN_PROGRESS", "EDITING_IN_PROGRESS");
        break;
      default:
        status;
    }
    const body = {
      filters: {
        status:status
      }
    }

    fetch(`${workFlowsUrl}/search?limit=999&page=${currentPage}&unique=brand`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((result) =>
        setBrands(
          result?.data?.uniqueValues
            .filter(Boolean)
            .map((item) => ({ brand: item }))
        )
      );

    fetch(
      `${workFlowsUrl}/search?limit=10&page=${currentPage}&unique=assignee`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    )
      .then((response) => response.json())
      .then((result) =>
        setAssignee(result?.data?.uniqueValues.filter(Boolean))
      );

    fetch(`${workFlowsUrl}/search?limit=10&page=${currentPage}&unique=status`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((result) => setStatus(result?.data?.uniqueValues));
  }, [currentPage, currentTab]);

  useEffect(() => {
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
      case "InProgress":
        status.push("WRITING_IN_PROGRESS", "EDITING_IN_PROGRESS");
        break;
      default:
        status;
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
        status: isStatusSelected ? [searchByStatus] : status
      },
      orderBy: {
        ...(currentSort == "Style" && { styleId: styleSort }),
        ...(currentSort == "Title" && { title: titleSort }),
        ...(currentSort == "Brand" && { brand: brandSort }),
        ...(currentSort == "UpdatedBy" && { lastUpdatedBy: updatedBySort }),
        ...(currentSort == "Assignee" && { lastUpdatedBy: assigneeSort }),
        ...(currentSort == "Status" && { status: statusSort }),
        ...({ lastUpdateTs: updatedAtSort })
      }
    };
    setLoader(true);
    fetch(`${workFlowsUrl}/search?limit=10&page=${currentPage}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((result) => {
        setCustomers(result?.data);
        setLoader(false);
      });
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
    isStatusSelected
  ]);

  useEffect(() => {
    if (customers?.pagination?.pageCount) {
      setPageCount(customers?.pagination?.pageCount);
    }
  }, [customers]);

  const handleStyleChanges = (e) => {
    setTimeout(() => {
      setSearchByStyle(e.target.value);
    }, 1000);
  };

  const handleTitleChange = (e) => {
    setTimeout(() => {
      setSearchByTitle(e.target.value);
    }, 2000);
  };

  const handleUpdatedByChange = (e) => {
    setTimeout(() => {
      setsearchByUpdatedBy(e.target.value);
    }, 1000);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end gap-4">
        {selectedProducts.length > 1 && (
          <>
            {currentTab == "Completed" && (
              <button
                className="flex"
                onClick={() => {
                  setStyleId(selectedProducts.map((e) => e?.styleId));
                  setIsModalVisible(true);
                  setAssigneeType("writers");
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
                  setStyleId(selectedProducts.map((e) => e?.styleId));
                  setIsModalVisible(true);
                  setAssigneeType("editors");
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
                  setAssigneeType("editors");
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
                  setAssigneeType("editors");
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
      <Dropdown
        style={{ width: "120px" }}
        value={searchByAssignee}
        options={assigneeList}
        onChange={handleAssign}
        itemTemplate={statusItemTemplate}
        placeholder="Select"
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
        <InputText onChange={handleTitleChange} />
      </span>
    );
  };

  const brandRowFilterTemplate = () => {
    return (
      <div>
        <MultiSelect
          value={selectedBrand}
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
        <InputText onChange={handleUpdatedByChange} />
      </span>
    );
  };

  const styleRowFilterTemplate = () => {
    return (
      <span className="p-input-icon-left w-[100%] min-w-[80px]">
        <i className="pi pi-search" />
        <InputText onChange={handleStyleChanges} />
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

  const handleFilterIcon = () => {
    return (
      <span>
        <button onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? (
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

  const handleAssigneeSort = () => {
    setCurrentSort("Assignee");
    setAssigneeSort(assigneeSort == "desc" ? "asc" : "desc");
    setDefaultSort(assigneeSort == "desc" ? ArrowSortDownLine : ArrowSortUpLine)
  };

  const handleUpdatedAtSort = () => {
    setCurrentSort("Updated At");
    setUpdatedAtSort(updatedAtSort == "desc" ? "asc" : "desc");
    setDefaultSort(updatedAtSort == "desc" ? ArrowSortDownLine : ArrowSortUpLine)
  };

  const handleUpdatedBySort = () => {
    setCurrentSort("Updated By");
    setUpdatedBySort(updatedBySort == "desc" ? "asc" : "desc");
    setDefaultSort(updatedBySort == "desc" ? ArrowSortDownLine : ArrowSortUpLine)
  };

  const handleStatusSort = () => {
    setCurrentSort("Status");
    setStatusSort(statusSort == "desc" ? "asc" : "desc");
    setDefaultSort(statusSort == "desc" ? ArrowSortDownLine : ArrowSortUpLine)
  };

  const handleBrandSort = () => {
    setCurrentSort("Brand");
    setBrandSort(brandSort == "desc" ? "asc" : "desc");
    setDefaultSort(brandSort == "desc" ? ArrowSortDownLine : ArrowSortUpLine)
  };

  const handleTitleSort = () => {
    setCurrentSort("Title");
    setTitleSort(titleSort == "desc" ? "asc" : "desc");
    setDefaultSort(titleSort == "desc" ? ArrowSortDownLine : ArrowSortUpLine)
  };

  const handleStyleSort = () => {
    setCurrentSort("Style");
    setStyleSort(styleSort == "desc" ? "asc" : "desc");
    setDefaultSort(styleSort == "desc" ? ArrowSortDownLine : ArrowSortUpLine)
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

  const handleRowSelectIcons = (rowData, imgPath, type) => {
    return (
      <div
        onClick={(e) => iconClickHandler(e, type, rowData)}
        className="flex justify-content-end"
      >
        <span>
          {rowData.id == showEdit && isRowSelected && isAdmin && (
            <button
              className="bg-white flex rounded-full justify-center items-center border border-grey-30  h-[30px] w-[30px]"
              onClick={handleEditIcon}
            >
              <img alt={`${imgPath} svg`} src={imgPath} />
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
        <div className="flex justify-content-end">
          <span>
            {rowData.id == showEdit && isRowSelected && isAdmin && (
              <button onClick={handleMoreIconClick}>
                <span className="bg-white flex rounded-full justify-center items-center border border-grey-30  h-[30px] w-[30px]">
                  <img alt={`${MoreIcons} svg`} src={MoreIcons} />
                </span>
              </button>
            )}
          </span>
        </div>
        {rowData.id == showEdit && showPopup && (
          <div className="absolute top-0 right-0">
            <MoreIconPopUp rowData={rowData} />
          </div>
        )}
      </div>
    );
  };

  const handleEditIcon = () => {
    // code for edit icon show go in this
  };

  const pagination = () => {
    return (
      <Pagination
        count={pageCount}
        preText={"< Prev"}
        nextText={"Next >"}
        className={"px-3 py-2 mr-2 leading-tight text-gray-500 bg-white"}
      />
    );
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
            filterDisplay={showFilters && "row"}
            onRowMouseEnter={onRowSelect}
            onRowMouseLeave={onRowUnselect}
            footer={pagination}
            onSelectionChange={onSelectionChange}
            emptyMessage="No Workflows found."
            onRowClick={onRowClick}
          >
            {isAdmin && (
              <Column selectionMode="multiple" style={{ width: "3%" }}></Column>
            )}
            <Column
              field="styleId"
              header={
                <TableHeaders
                  headerName={"Style"}
                  sortIcon={defaultSort}
                  onClick={handleStyleSort}
                  currentSort={currentSort}
                  ArrowSort={ArrowSort}
                />
              }
              filter
              showFilterMenu={false}
              filterElement={styleRowFilterTemplate}
              filterPlaceholder="Search by Style"
              style={{ width: "5%" }}
            />
            <Column
              field="title"
              header={
                <TableHeaders
                  headerName={"Title"}
                  sortIcon={defaultSort}
                  onClick={handleTitleSort}
                  currentSort={currentSort}
                  ArrowSort={ArrowSort}
                />
              }
              filter
              filterElement={titleRowFilterTemplate}
              showFilterMenu={false}
              filterPlaceholder="Search by Title"
              style={{ width: "22%" }}
            />
            <Column
              header={
                <TableHeaders
                  headerName={"Brand"}
                  sortIcon={defaultSort}
                  onClick={handleBrandSort}
                  currentSort={currentSort}
                  ArrowSort={ArrowSort}
                />
              }
              field="brand"
              showFilterMenu={false}
              filter
              filterElement={brandRowFilterTemplate}
              style={{ width: "10%" }}
            />
            {currentTab !== "Unassigned" && (
              <Column
                field="status"
                header={
                  <TableHeaders
                    headerName={"Status"}
                    sortIcon={defaultSort}
                    onClick={handleStatusSort}
                    currentSort={currentSort}
                    ArrowSort={ArrowSort}
                  />
                }
                showFilterMenu={false}
                filter
                filterElement={statusRowFilterTemplate}
                style={{ width: "18%" }}
              />
            )}
            {currentTab !== "Completed" &&
              currentTab !== "Unassigned" &&
              isAdmin && (
                <Column
                  field="assignee"
                  header={
                    <TableHeaders
                      headerName={"Assignee"}
                      sortIcon={defaultSort}
                      onClick={handleAssigneeSort}
                      currentSort={currentSort}
                      ArrowSort={ArrowSort}
                    />
                  }
                  showFilterMenu={false}
                  filter
                  filterElement={assigneeRowFilterTemplate}
                  style={{ width: "13%" }}
                />
              )}
            <Column
              field="lastUpdatedBy"
              header={
                <TableHeaders
                  headerName={"Updated By"}
                  sortIcon={defaultSort}
                  onClick={handleUpdatedBySort}
                  currentSort={currentSort}
                  ArrowSort={ArrowSort}
                />
              }
              filter
              showFilterMenu={false}
              filterElement={updatedByFilterTemplate}
              style={{ width: "15%" }}
            />
            <Column
              field="lastUpdateTs"
              header={
                <TableHeaders
                  headerName={"Updated At"}
                  sortIcon={defaultSort}
                  onClick={handleUpdatedAtSort}
                  currentSort={currentSort}
                  ArrowSort={ArrowSort}
                />
              }
              dataType="date"
              filter
              showFilterMenu={false}
              body={dateBodyTemplate}
              filterElement={dateFilterTemplate}
              style={{ width: "14%" }}
            />
            <Column header={handleFilterIcon} style={{ width: "0%" }} />
            <Column
              body={(e) => handleRowSelectIcons(e, Edit, "edit")}
              style={{ width: "0%" }}
            />
            {currentTab !== "Completed" && (
              <Column
                body={(e) =>
                  handleRowSelectIcons(
                    e,
                    currentTab == "Assigned" || currentTab == "InProgress"
                      ? ReAssign
                      : AssigneEdit,
                    "assign"
                  )
                }
                style={{ width: "0%" }}
              />
            )}
            {currentTab === "Completed" && (
              <Column body={handleMoreIcon} style={{ width: "0%" }} />
            )}
          </DataTable>
        )}
      </div>
    </>
  );
}
