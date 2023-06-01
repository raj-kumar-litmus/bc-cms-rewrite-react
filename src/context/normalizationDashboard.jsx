import React, { useEffect, createContext, useState } from "react";
import useSessionStorage from "../hooks/useSessionStorage";

const DashBoardContext = createContext(undefined);

function DashBoardProvider({ children }) {
  const [workflowId, setWorkflowId] = useState(null);
  const [styleId, setStyleId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [assigneeType, setAssigneeType] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentTab, setCurrentTab] = useState("default");
  const [showToast, setShowToast] = useState(false);
  const [clearAllFilters, setClearAllFilters] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [searchByStatus, setSearchByStatus] = useState([]);
  const [searchByAssignee, setSearchByAssignee] = useState("");
  const [searchByUpdatedAt, setsearchByUpdatedAt] = useState(null);
  const { VITE_ADMIN_GROUP_NAME: ADMIN_GROUP_NAME } = process.env;
  const [groups] = useSessionStorage("userGroups");

  useEffect(() => {
    setIsAdmin(groups?.includes(ADMIN_GROUP_NAME));
  }, [ADMIN_GROUP_NAME, setIsAdmin]);

  const clearFilters = () => {
    setClearAllFilters(true);
    setSelectedBrand([]);
    setSearchByStatus([]);
    setSearchByAssignee("");
    setsearchByUpdatedAt(null);
  };

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
        setStyleId,
        showToast,
        setShowToast,
        clearAllFilters,
        setClearAllFilters,
        selectedBrand,
        setSelectedBrand,
        searchByStatus,
        setSearchByStatus,
        searchByAssignee,
        setSearchByAssignee,
        searchByUpdatedAt,
        setsearchByUpdatedAt,
        clearFilters
      }}
    >
      {children}
    </DashBoardContext.Provider>
  );
}

export { DashBoardProvider, DashBoardContext };
