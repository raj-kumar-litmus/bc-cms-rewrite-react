import React from 'react';
import { useState, useEffect } from "react";
import useSessionStorage from "../hooks/useSessionStorage";

function WriterDashBoardTabs() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [groups] = useSessionStorage("userGroups");
  const { VITE_ADMIN_GROUP_ID: ADMIN_GROUP_ID } = process;
  const [currentTab, setCurrentTab] = useState("Unassigned");
  const  [Tabs, setTabs] = useState(["Unassigned", "Assigned", "Completed", "InProgress"])

  const handleTabEvents = (tab) => {
    setCurrentTab(tab.target.innerText);
  };

  useEffect(() => {
    setIsAdmin(groups?.includes(ADMIN_GROUP_ID));
  }, [ADMIN_GROUP_ID, setIsAdmin]);


  return (
    <div className="text-sm border-b">
      <div className="flex">
        {isAdmin && (
          <div>
            {Tabs?.map((item)=>
             (<button
               onClick={(e) => handleTabEvents(e)}
               className={
                 currentTab == "Unassigned"
                   ? "py-2 px-8 font-bold border-b-2"
                   : "py-2 px-8"
               }
             >
              {item}
             </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default WriterDashBoardTabs;
