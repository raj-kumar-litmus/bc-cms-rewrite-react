import React, { useEffect, createContext, useState } from "react";
import useSessionStorage from "../hooks/useSessionStorage";
import { properties } from "../properties";

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
  const [selectedStyleId, setSelectedStyleId] = useState([]);
  const [searchByStatus, setSearchByStatus] = useState([]);
  const [searchByAssignee, setSearchByAssignee] = useState("");
  const [searchByUpdatedAt, setsearchByUpdatedAt] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [searchByUpdatedBy, setsearchByUpdatedBy] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState("");
  const [debouncedStyle, setDebouncedStyle] = useState("");
  const [debouncedUpdatedBy, setDebouncedUpdatedBy] = useState("");
  const [showTabs, setShowTabs] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [search, setSearch] = useState("");
  const [reselectSelectedProducts, setReselectSelectedProducts] =
    useState(false);
  const [workflowCount, setWorkflowCount] = useState(0);
  const [currentSort, setCurrentSort] = useState("");
  const [styleSort, setStyleSort] = useState("desc");
  const [titleSort, setTitleSort] = useState("desc");
  const [brandSort, setBrandSort] = useState("desc");
  const [statusSort, setStatusSort] = useState("desc");
  const [updatedBySort, setUpdatedBySort] = useState("desc");
  const [updatedAtSort, setUpdatedAtSort] = useState("desc");
  const [assigneeSort, setAssigneeSort] = useState("desc");
  const [showStyleFilter, setShowStyleFilter] = useState(true);
  const {
    VITE_ADMIN_GROUP_NAME: ADMIN_GROUP_NAME,
    VITE_WRITER_GROUP_NAME: WRITER_GROUP_NAME,
    VITE_EDITOR_GROUP_NAME: EDITOR_GROUP_NAME
  } = process.env;
  const [groups] = useSessionStorage("userGroups");

  useEffect(() => {
    setIsWriter(groups?.includes(WRITER_GROUP_NAME));
    setIsEditor(groups?.includes(EDITOR_GROUP_NAME));
    setIsAdmin(groups?.includes(ADMIN_GROUP_NAME));
  }, [
    ADMIN_GROUP_NAME,
    WRITER_GROUP_NAME,
    EDITOR_GROUP_NAME,
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
    setAppliedFilters({});
    setCurrentSort("");
  };

  return (
    <DashBoardContext.Provider
      value={{
        workflowId,
        isAdmin,
        isWriter,
        isEditor,
        selectAll,
        setSelectAll,
        workflowCount,
        setWorkflowCount,
        reselectSelectedProducts,
        setReselectSelectedProducts,
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
        appliedFilters,
        setAppliedFilters,
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
        clearFilters,
        currentSort,
        setCurrentSort,
        styleSort,
        setStyleSort,
        titleSort,
        setTitleSort,
        brandSort,
        setBrandSort,
        statusSort,
        setStatusSort,
        updatedBySort,
        setUpdatedBySort,
        updatedAtSort,
        setUpdatedAtSort,
        assigneeSort,
        setAssigneeSort,
        selectedStyleId,
        setSelectedStyleId,
        showStyleFilter,
        setShowStyleFilter,
        search,
        setSearch
      }}
    >
      {children}
    </DashBoardContext.Provider>
  );
}

export { DashBoardProvider, DashBoardContext };
