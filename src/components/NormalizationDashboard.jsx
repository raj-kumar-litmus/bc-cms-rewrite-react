import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";
import StatusBarsForNormalization from "./StatusBarsForNormalization.jsx";
import GlobalSearch from "./GlobalSearch.jsx";
import WriterDashBoardTabs from "./WriterDashBoardTabs.jsx";
import AssignStyle from "../pages/assignStyle.jsx";
import GreenTick from "../logos/green-tick.svg";

function NormalizationDashboard() {
  const toastBR = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [styleAssigned, setStyleAssigned] = useState(false);
  const [assigneeType, setAssigneeType] = useState("writers");

  const Summary = () => {
    return (
      <div className="flex">
        <div>
          <img src={GreenTick} alt="GreenTick SVG" />
        </div>
        <div className="flex flex-col ml-[20px]">
          <p>Succesfully Assigned</p>
          <p>David John assigned as the editor for WUSJ903</p>
        </div>
      </div>
    );
  };
  const showTopCenter = () => {
    toastBR.current.show({
      severity: "info",
      content: <Summary />,
      sticky: true
    });
    setStyleAssigned(false);
  };

  const styleAssignedHandler = () => {
    setStyleAssigned(true);
    setIsModalVisible(false);
  };

  const styles = [
    "BHNJ234",
    "CGHD23Y",
    "WUSJ903",
    "DFWY126",
    "DJEKI973",
    "JSNJF274",
    "OGDT23Y",
    "SUWJ948",
    "DHFY117",
    "BHNJ234",
    "CGHD23Y",
    "WUSJ903",
    "DFWY126",
    "DJEKI973",
    "JSNJF274",
    "OGDT23Y",
    "SUWJ948",
    "DHFY117",
    "BHNJ234",
    "CGHD23Y",
    "WUSJ903",
    "DFWY126",
    "DJEKI973",
    "JSNJF274",
    "OGDT23Y",
    "SUWJ948",
    "DHFY117"
  ];

  return (
    <div className="bg-white pb-[20px]">
      <div className="mx-[5%]">
        <StatusBarsForNormalization isAdmin={isAdmin}/>
      <div className="mt-[40px]">
        <GlobalSearch searchString={"Search"} inputClasses={"bg-white w-full h-[64px] items-center pl-[24px] text-sm placeholder-gray-20 rounded border border-grey-30 shadow"}
        buttonClasses={"text-white bg-black h-[64px] w-[131px] rounded ml-2"} />
      </div>
      <div className="mt-[49px]">
        <WriterDashBoardTabs handleTabEvents={handleTabEvents} currentTab={currentTab} isAdmin={isAdmin}/>
      </div>
      <div className="mt-[49px]">
        <Table currentTab={currentTab} setCustomers={setCustomers} isAdmin={isAdmin} customers={customers} preText={"< Prev"} nextText={"Next >"} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </div>
      <div>
        <button
          aria-label="temp-assign-button"
          className="ml-[20px]"
          onClick={() => {
            setIsModalVisible(!isModalVisible);
            setAssigneeType("writers");
          }}
        >
          Assign to Writer
        </button>
        <button
          aria-label="temp-assign-button"
          className="ml-[20px] mr-[20px]"
          onClick={() => {
            setIsModalVisible(!isModalVisible);
            setAssigneeType("editors");
          }}
        >
          Assign to Editor
        </button>
        <Link
          to={"/styleDetails"}
          state={{ quickFix: true, styleId: "CGHD23YYZZ" }}
        >
          Quick Fix
        </Link>
        {isModalVisible && (
          <AssignStyle
            styles={styles}
            userGroup={assigneeType}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            setStyleAssigned={styleAssignedHandler}
          />
        )}
        <Toast ref={toastBR} position="top-center" />
        {styleAssigned && showTopCenter()}
      </div>
      <div className="m-10">
        <GlobalSearch searchString={"Search"} />
      </div>
      </div>
  );
}
export default NormalizationDashboard;
