import React, { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import StatusBarsForNormalization from "./StatusBarsForNormalization.jsx";
import GlobalSearch from "./GlobalSearch.jsx";
import WriterDashBoardTabs from "./WriterDashBoardTabs.jsx";
import AssignStyle from "../pages/assignStyle.jsx";
import GreenTick from "../logos/green-tick.svg";
import RedCross from "../logos/red-cross-in-circle.svg";
import Table from "./Table.jsx";
import useSessionStorage from "../hooks/useSessionStorage";

function NormalizationDashboard() {
  const toastBR = useRef(null);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [styleAssigned, setStyleAssigned] = useState(false);
  const [assigneeType, setAssigneeType] = useState("writers");
  const [styleId, setStyleId] = useState(null);
  const [assignee, setAssignee] = useState(null);
  const [userGroup, setUserGroup] = useState(null);
  const [errorToast, setErrorToast] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentTab, setCurrentTab] = useState("Completed");
  const [customers, setCustomers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [groups] = useSessionStorage("userGroups");
  const [accountDetails] = useSessionStorage("accountDetails");
  const [workflowId, setWorkflowId] = useState(null);
  const [loader, setLoader] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { VITE_ADMIN_GROUP_NAME: ADMIN_GROUP_NAME } = process.env;

  useEffect(() => {
    setIsAdmin(groups?.includes(ADMIN_GROUP_NAME));
  }, [ADMIN_GROUP_NAME, setIsAdmin]);

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
    setSelectedProducts([])
  };

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

  useEffect(() => {
    if (styleAssigned) {
      showTopCenter();
    }
  }, [styleAssigned]);

  return (
    <div className="bg-white pb-[20px]">
      <div className="mx-[5%]">
        <StatusBarsForNormalization isAdmin={isAdmin} />
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
          <WriterDashBoardTabs
            loader={loader}
            handleTabEvents={handleTabEvents}
            currentTab={currentTab}
            isAdmin={isAdmin}
          />
        </div>
        <div className="mt-[49px]">
          <Table
            loader={loader}
            setLoader={setLoader}
            setWorkflowId={setWorkflowId}
            setAssigneeType={setAssigneeType}
            setStyleId={setStyleId}
            setIsModalVisible={setIsModalVisible}
            currentTab={currentTab}
            setCustomers={setCustomers}
            isAdmin={isAdmin}
            customers={customers}
            preText={"< Prev"}
            nextText={"Next >"}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        </div>

        {isModalVisible && (
          <AssignStyle
            styles={styleId}
            workflowId={workflowId}
            userGroup={assigneeType}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            setStyleAssigned={styleAssignedHandler}
          />
        )}
        <Toast ref={toastBR} position="top-center" />
        <div className="m-10">
          {/* <GlobalSearch searchString={"Search"} /> */}
        </div>
      </div>
    </div>
  );
}
export default NormalizationDashboard;
