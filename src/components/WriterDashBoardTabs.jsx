import React from 'react';
import { useState, useEffect } from "react";
import useSessionStorage from "../hooks/useSessionStorage";

function WriterDashBoardTabs() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [groups] = useSessionStorage("userGroups");
  const { VITE_ADMIN_GROUP_ID: ADMIN_GROUP_ID } = process;
  const [currentTab, setCurrentTab] = useState("Unassigned");
  const handleTabEvents = (tab) => {
    if (tab.target.innerText === "Unassigned") {
      setCurrentTab("Unassigned");
    }
    if (tab.target.innerText === "Completed") {
      setCurrentTab("Completed");
    }
    if (tab.target.innerText == "Assigned") {
      setCurrentTab("Assigned");
    }
    if (tab.target.innerText == "InProgress") {
      setCurrentTab("InProgress");
    }
  };

  useEffect(() => {
    setIsAdmin(groups?.includes(ADMIN_GROUP_ID));
  }, [ADMIN_GROUP_ID, setIsAdmin]);

  return (
    <div className="text-sm border-b">
      <div className="flex">
        {isAdmin && (
          <button
          data-testid="Unassigned"
            onClick={(e) => handleTabEvents(e)}
            className={
              currentTab == "Unassigned"
                ? "py-2 px-8 font-bold border-b-2"
                : "py-2 px-8"
            }
          >
            Unassigned
          </button>
        )}

        <button
        data-testid="Completed"
          onClick={(e) => handleTabEvents(e)}
          className={
            currentTab == "Completed"
              ? "py-2 px-8 font-bold border-b-2"
              : "py-2 px-8"
          }
        >
          Completed
        </button>

        <button
          data-testid="Assigned"
          onClick={(e) => handleTabEvents(e)}
          className={
            currentTab == "Assigned"
              ? "py-2 px-8 font-bold border-b-2"
              : "py-2 px-8"
          }
        >
          Assigned
        </button>

        <button
          data-testid="InProgress"
          onClick={(e) => handleTabEvents(e)}
          className={
            currentTab == "InProgress"
              ? "py-2 px-8 font-bold border-b-2"
              : "py-2 px-8"
          }
        >
          InProgress
        </button>
      </div>
    </div>
  );
}
export default WriterDashBoardTabs;
