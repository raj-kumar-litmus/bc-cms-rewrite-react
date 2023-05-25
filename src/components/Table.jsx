import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

export default function Table({
  loader,
  setLoader,
  setIsModalVisible,
  setAssigneeType,
  setStyleId,
  setWorkflowId,
  currentTab,
  setCustomers,
  customers,
  isAdmin,
  preText,
  nextText,
  currentPage,
  setCurrentPage
}) {
  const [searchByStyle, setSearchByStyle] = useState("");
  const [searchByTitle, setSearchByTitle] = useState("");
  const [searchByStatus, setSearchByStatus] = useState([]);
  const [searchByAssignee, setSearchByAssignee] = useState("");
  const [searchByUpdatedBy, setsearchByUpdatedBy] = useState("");
  const [searchByUpdatedAt, setsearchByUpdatedAt] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
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
  const navigate = useNavigate();
  const [userEmail] = useSessionStorage("userEmail");

  useEffect(() => {
    fetch(`${workFlowsUrl}/search?limit=10&page=${currentPage}&unique=brand`, {
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
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((result) => setStatus(result?.data?.uniqueValues));
  }, [currentPage]);

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
        ...((searchByAssignee || !isAdmin) && {assignee: !isAdmin  ? userEmail : searchByAssignee }),
        ...(searchByUpdatedAt && { lastUpdateTs: finalDate }),
        status: isStatusSelected ? [searchByStatus] : status
      },
      orderBy: {
        ...(currentSort == "styleSort" && { styleId: styleSort }),
        ...(currentSort == "titleSort" && { title: titleSort }),
        ...(currentSort == "brandSort" && { brand: brandSort }),
        ...(currentSort == "updatedBySort" && { lastUpdatedBy: updatedBySort }),
        ...(currentSort == "assigneeSort" && { lastUpdatedBy: assigneeSort }),
        ...(currentSort == "statusSort" && { status: statusSort }),
        ...(currentSort == "updatedAtSort" && { lastUpdateTs: updatedAtSort })
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
            <button
              className="flex"
              onClick={() => {
                setStyleId(selectedProducts.map((e) => e?.styleId));
                setIsModalVisible(true);
                setAssigneeType("writers");
              }}
            >
            <span className="bg-white flex rounded-full justify-center items-center border w-[30px] h-[30px] border-grey-30 mr-1">
             <img alt={`AssignToWriter svg`} src={AssignToWriter} />
            </span>
              <span>Assign to Writer</span>
            </button>
         
            <button
              className="flex"
              onClick={() => {
                setStyleId(selectedProducts.map((e) => e?.styleId));
                setIsModalVisible(true);
                setAssigneeType("editors");
              }}
            >
             <span className="bg-white flex rounded-full justify-center items-center border w-[30px] h-[30px] border-grey-30 mr-1">
             <img alt={`AssignToEditor svg`} src={AssignToEditor} />
            </span>
              <span>Assign to Editor</span>
            </button>
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
        style={{ width: "100px" }}
        value={searchByStatus}
        options={statuses}
        onChange={handleStatus}
        itemTemplate={statusItemTemplate}
        placeholder="Status"
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
        placeholder="Assignee"
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
      <MultiSelect
        value={selectedBrand}
        options={brands}
        itemTemplate={representativesItemTemplate}
        onChange={(e) => handleBrands(e.value)}
        optionLabel="brand"
        placeholder="Brand"
        maxSelectedLabels={1}
        style={{ width: "100px" }}
      />
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
        <img
          alt={`${CalendarIcon} svg`}
          src={CalendarIcon}
          className="absolute right-2 top-4 z-10"
        />
        <Calendar
          value={searchByUpdatedAt}
          onChange={handleCalanderChange}
          className={Boolean && "p-calendar p-component p-inputwrapper"}
          style={{minWidth: "60px"}}
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
          {!showFilters ? (
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
    setCurrentSort("assigneeSort");
    setAssigneeSort(assigneeSort == "desc" ? "asc" : "desc");
  };

  const handleUpdatedAtSort = () => {
    setCurrentSort("updatedAtSort");
    setUpdatedAtSort(updatedAtSort == "desc" ? "asc" : "desc");
  };

  const handleUpdatedBySort = () => {
    setCurrentSort("updatedBySort");
    setUpdatedBySort(updatedBySort == "desc" ? "asc" : "desc");
  };

  const handleStatusSort = () => {
    setCurrentSort("statusSort");
    setStatusSort(statusSort == "desc" ? "asc" : "desc");
  };

  const handleBrandSort = () => {
    setCurrentSort("brandSort");
    setBrandSort(brandSort == "desc" ? "asc" : "desc");
  };

  const handleTitleSort = () => {
    setCurrentSort("titleSort");
    setTitleSort(titleSort == "desc" ? "asc" : "desc");
  };

  const handleStyleSort = () => {
    setCurrentSort("styleSort");
    setStyleSort(styleSort == "desc" ? "asc" : "desc");
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
      console.log(rowData);
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
            <MoreIconPopUp
              setStyleId={setStyleId}
              setWorkflowId={setWorkflowId}
              setAssigneeType={setAssigneeType}
              setIsModalVisible={setIsModalVisible}
              rowData={rowData}
            />
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
        customers={customers}
        preText={preText}
        nextText={nextText}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
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
    <div className="border border-grey-30 text-sx">
      {loader && <Loader />}
      {!loader && (
        <DataTable
          value={customers?.workflows}
          dataKey="id"
          rows={100}
          selection={selectedProducts}
          filterDisplay={showFilters && "row"}
          onRowMouseEnter={onRowSelect}
          onRowMouseLeave={onRowUnselect}
          header={selectedProducts.length > 1 && renderHeader}
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
                sortIcon={ArrowSort}
                onClick={handleStyleSort}
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
                sortIcon={ArrowSort}
                onClick={handleTitleSort}
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
                sortIcon={ArrowSort}
                onClick={handleBrandSort}
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
                  sortIcon={ArrowSort}
                  onClick={handleStatusSort}
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
                    sortIcon={ArrowSort}
                    onClick={handleAssigneeSort}
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
                headerName={"Updated BY"}
                sortIcon={ArrowSort}
                onClick={handleUpdatedBySort}
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
                sortIcon={ArrowSort}
                onClick={handleUpdatedAtSort}
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
              body={(e) => handleRowSelectIcons(e, AssigneEdit, "assign")}
              style={{ width: "0%" }}
            />
          )}
          {currentTab === "Completed" && (
            <Column body={handleMoreIcon} style={{ width: "0%" }} />
          )}
        </DataTable>
      )}
    </div>
  );
}
