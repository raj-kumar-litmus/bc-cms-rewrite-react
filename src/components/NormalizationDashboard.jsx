import { useState, useEffect} from "react";
import StatusBarsForNormalization from "./StatusBarsForNormalization.jsx";
import GlobalSearch from "./GlobalSearch.jsx";
import WriterDashBoardTabs from "./WriterDashBoardTabs.jsx";
import Table from "./Table.jsx";
import useSessionStorage from "../hooks/useSessionStorage";
import {workFlowsUrl} from '../constants/index';

function NormalizationDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentTab, setCurrentTab] = useState(isAdmin? "Unassigned":"Completed");
  const [customers, setCustomers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [groups] = useSessionStorage("userGroups");
  const { VITE_ADMIN_GROUP_ID: ADMIN_GROUP_ID } = process.env;

  useEffect(() => {
    setIsAdmin(groups?.includes(ADMIN_GROUP_ID));
  }, [ADMIN_GROUP_ID, setIsAdmin]);

  useEffect(() => {
    fetch(`${workFlowsUrl}/search?page=${currentPage}&limit=10`)
        .then(response => response.json())
        .then(result => setCustomers(result?.data))
        .catch(error => (error));
}, []);

  const handleTabEvents = (tab) => {
    setCurrentTab(tab.target.innerText)
  };

  return (
    <div className="bg-grey-40 pb-[20px]">
      <div className="mx-[139px]">
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
      </div>
    </div>
  );
}
export default NormalizationDashboard;
