import React, { useEffect, createContext, useState } from "react";
import useSessionStorage from "../hooks/useSessionStorage";

const DashBoardContext = createContext(undefined);

function DashBoardProvider({ children }) {
  const [workflowId, setWorkflowId] = useState(null);
  const [styleId, setStyleId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [assigneeType, setAssigneeType] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentTab, setCurrentTab] = useState("Completed");

  const { VITE_ADMIN_GROUP_NAME: ADMIN_GROUP_NAME } = process.env;

  const [groups] = useSessionStorage("userGroups");

  useEffect(() => {
    setIsAdmin(groups?.includes(ADMIN_GROUP_NAME));
  }, [ADMIN_GROUP_NAME, setIsAdmin]);

  return (
    <DashBoardContext.Provider
      value={{
        workflowId,
        isAdmin,
        setWorkflowId,
        isModalVisible,
        setIsModalVisible,
        loader,
        setLoader,
        currentPage,
        setCurrentPage,
        assigneeType,
        setAssigneeType,
        customers,
        setCustomers,
        selectedProducts,
        setSelectedProducts,
        currentTab,
        setCurrentTab,
        styleId,
        setStyleId
      }}
    >
      {children}
    </DashBoardContext.Provider>
  );
}

export { DashBoardProvider, DashBoardContext };
