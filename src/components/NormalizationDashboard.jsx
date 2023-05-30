import React, {useState, useEffect, useContext, useRef } from "react";
import { Toast } from 'primereact/toast';
import { DashBoardContext } from "../context/normalizationDashboard.jsx";
import { useNavigate } from "react-router-dom";
import { workFlowsUrl } from "../constants/index";
import StatusBarsForNormalization from "./StatusBarsForNormalization.jsx";
import GlobalSearch from "./GlobalSearch.jsx";
import WriterDashBoardTabs from "./WriterDashBoardTabs.jsx";
import AssignStyle from "../pages/assignStyle.jsx";
import Table from "./Table.jsx";
import useSessionStorage from "../hooks/useSessionStorage";

function NormalizationDashboard() {
  const navigate = useNavigate();
  const toast = useRef(null);
  const [accountDetails] = useSessionStorage("accountDetails");
  const [search, setSearch] = useState('')
  const { setSelectedProducts, setCurrentTab, setCurrentPage, isAdmin, setCustomers, currentPage, setLoader, showToast, setShowToast } =
    useContext(DashBoardContext);

  useEffect(() => {
    setCurrentTab(isAdmin ? "Unassigned" : "Assigned");
  }, [isAdmin]);

  useEffect(()=>{
    if(showToast){
      toast.current.show({severity:'error', summary: 'Error', detail:'Something went wrong. Please try again', life: 3000});
    }
  },[showToast])

  useEffect(() => {
    if (!accountDetails?.idTokenClaims?.exp) {
      navigate("/");
    }
  }, [accountDetails]);

  const handleTabEvents = (tab) => {
    setCurrentPage(1);
    setCurrentTab(tab.target.innerText);
    setSelectedProducts([]);
  };
 
  const handleSearchChange=(e)=>{
    setSearch(e.target.value)
  }

  async function getGloblSearch(){
    const response = await fetch(`${workFlowsUrl}/search?limit=10&page=${currentPage}&globalSearch=${search}`,
       {
        method: 'POST',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
  )
  const data = await response.json();
  if(data?.success){
    setCustomers(data?.data);
        setLoader(false);
  }
  if (!data?.success){
    setLoader(false);
    setShowToast(true)
	}
  }

  const handleSearchClick=()=>{
    setLoader(true)
    getGloblSearch()
  }

  return (
    <>
     <div className="card flex justify-content-center">
            <Toast ref={toast} />
        </div>
    <div className="bg-white pb-[20px]">
      <div className="mx-[5%]">
        <StatusBarsForNormalization />
        <div className="mt-[40px]">
          <GlobalSearch
            onChange={handleSearchChange}
            onClick={handleSearchClick}
            value={search}
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
          <WriterDashBoardTabs handleTabEvents={handleTabEvents} />
        </div>
        <div className="mt-[49px]">
          <Table />
        </div>
        <AssignStyle />
        <div className="m-10">
          {/* <GlobalSearch searchString={"Search"} /> */}
        </div>
      </div>
    </div>
    </>
  );
}
export default NormalizationDashboard;
