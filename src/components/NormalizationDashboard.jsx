import React, { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";
import StatusBarsForNormalization from "./StatusBarsForNormalization.jsx";
import GlobalSearch from "./GlobalSearch.jsx";
import WriterDashBoardTabs from "./WriterDashBoardTabs.jsx";
import AssignStyle from "../pages/assignStyle.jsx";
import GreenTick from "../logos/green-tick.svg";
import RedCross from "../logos/red-cross-in-circle.svg";

function NormalizationDashboard() {
  const toastBR = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [styleAssigned, setStyleAssigned] = useState(false);
  const [assigneeType, setAssigneeType] = useState("writers");
  const [styleId, setStyleId] = useState(null);
  const [assignee, setAssignee] = useState(null);
  const [userGroup, setUserGroup] = useState(null);
  const [errorToast, setErrorToast] = useState(false);

  const Summary = () => {
    return (
      <div className="flex">
        {!errorToast && <img src={GreenTick} alt="GreenTick" />}
        {errorToast && <img src={RedCross} alt="RedCross" />}
        <div className="flex flex-col ml-[20px]">
          <p>{!errorToast && "Succesfully Assigned"}</p>
          <p>{errorToast && "Something went wrong !"}</p>
          <p>
            {!errorToast &&
              `${assignee} assigned as the ${userGroup} for ${styleId}`}
          </p>
        </div>
      </div>
    );
  };
  const showTopCenter = () => {
    toastBR.current.show({
      severity: errorToast ? "error" : "success",
      content: <Summary />,
      sticky: true
    });
    setStyleAssigned(false);
  };

  const styleAssignedHandler = ({
    styleId,
    assignee,
    userGroup,
    error = false
  }) => {
    setStyleId(styleId);
    setAssignee(assignee);
    setUserGroup(userGroup);
    setStyleAssigned(true);
    setIsModalVisible(false);
    setErrorToast(error);
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

  useEffect(() => {
    if (styleAssigned) {
      showTopCenter();
    }
  }, [styleAssigned]);

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
          aria-label="temp-assign-button-writer"
          className="ml-[20px]"
          onClick={() => {
            setIsModalVisible(!isModalVisible);
            setAssigneeType("writers");
          }}
        >
          Assign to Writer
        </button>
        <button
          aria-label="temp-assign-button-editor"
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
          className="mr-[20px]"
          state={{ quickFix: true, styleId: "CGHD23YYZZ" }}
        >
          Quick Fix for CGHD23YYZZ
        </Link>
        <Link to={"/styleDetails"}>Style details for CGHD23YYZZ</Link>
        {isModalVisible && (
          <AssignStyle
            styles={assigneeType === "editors" ? ["ABCDRF"] : ["ABCDRF"]}
            workflowId={"645cd39f165d71b6a35e3f33"}
            userGroup={assigneeType}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            setStyleAssigned={styleAssignedHandler}
          />
        )}
        <Toast ref={toastBR} position="top-center" />
      </div>
      <div className="m-10">
        <GlobalSearch searchString={"Search"} />
      </div>
      </div>
  );
}
export default NormalizationDashboard;
