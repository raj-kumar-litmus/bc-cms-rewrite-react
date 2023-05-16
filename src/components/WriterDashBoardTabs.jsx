import React from 'react';
import { useState, useEffect } from "react";
import useSessionStorage from "../hooks/useSessionStorage";
import TabsDetails from './TabsDetails';

function WriterDashBoardTabs() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [groups] = useSessionStorage("userGroups");
  const { VITE_ADMIN_GROUP_ID: ADMIN_GROUP_ID } = process;
  const [currentTab, setCurrentTab] = useState("Unassigned");

  useEffect(() => {
    setIsAdmin(groups?.includes(ADMIN_GROUP_ID));
  }, [ADMIN_GROUP_ID, setIsAdmin]);

    const handleTabEvents = (tab) => {
      setCurrentTab(tab.target.innerText);
    };

  return (
    <div className="text-sm border-b dark:border-bg">
    <div className="flex">
      {isAdmin && (
        <TabsDetails
        handleTabEvents={handleTabEvents}
        tabName={"Unassigned"}
        currentTab={currentTab}
        />
      )}

      <TabsDetails
        tabName={"Completed"}
        handleTabEvents={handleTabEvents}
        currentTab={currentTab}
        />

       <TabsDetails
        tabName={"Assigned"}
        handleTabEvents={handleTabEvents}
        currentTab={currentTab}
        />

      <TabsDetails
        tabName={"InProgress"}
        handleTabEvents={handleTabEvents}
        currentTab={currentTab}
        />
    </div>
  </div>
  );
}
export default WriterDashBoardTabs;
