import React, { useEffect, createContext, useState } from "react";
import useSessionStorage from "../hooks/useSessionStorage";
import properties from "../properties";

const DashBoardContext = createContext(undefined);

function DashBoardProvider({ children }) {
  const [workflowId, setWorkflowId] = useState(null);
  const [searchByTitle, setSearchByTitle] = useState("");
  const [searchByStyle, setSearchByStyle] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [styleId, setStyleId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState("default");
  const [isWriter, setIsWriter] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
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
  const [searchByUpdatedBy, setsearchByUpdatedBy] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState("");
  const [debouncedStyle, setDebouncedStyle] = useState("");
  const [debouncedUpdatedBy, setDebouncedUpdatedBy] = useState("");
  const [showTabs, setShowTabs] = useState(true);
  const { adminGroupName, writerGroupName, editorGroupName } = properties;
  const [groups] = useSessionStorage("userGroups");

  useEffect(() => {
    setIsWriter(groups?.includes(writerGroupName));
    setIsEditor(groups?.includes(editorGroupName));
    setIsAdmin(groups?.includes(adminGroupName));
  }, [
    adminGroupName,
    writerGroupName,
    editorGroupName,
    setIsWriter,
    setIsEditor,
    setIsAdmin
  ]);

  const clearFilters = () => {
    setClearAllFilters(true);
    setSelectedBrand([]);
    setSearchByStatus([]);
    setSearchByAssignee("");
    setsearchByUpdatedAt(null);
    setSearchByTitle("");
    setSearchByStyle("");
    setsearchByUpdatedBy("");
    setDebouncedTitle("");
    setDebouncedStyle("");
    setDebouncedUpdatedBy("");
  };

  return (
    <DashBoardContext.Provider
      value={{
        workflowId,
        isAdmin,
        isWriter,
        isEditor,
        debouncedTitle,
        setDebouncedTitle,
        debouncedStyle,
        setDebouncedStyle,
        debouncedUpdatedBy,
        setDebouncedUpdatedBy,
        searchByUpdatedBy,
        setsearchByUpdatedBy,
        searchByTitle,
        setSearchByTitle,
        searchByStyle,
        setSearchByStyle,
        showFilters,
        setShowFilters,
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
        showTabs,
        setShowTabs,
        clearFilters
      }}
    >
      {children}
    </DashBoardContext.Provider>
  );
}

export { DashBoardProvider, DashBoardContext };
