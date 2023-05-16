import React from "react";
import { useState, useEffect } from "react";
import useSessionStorage from "../hooks/useSessionStorage";
import Button from "./Button";

function WriterDashBoardTabs() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [groups] = useSessionStorage("userGroups");
  const { VITE_ADMIN_GROUP_ID: ADMIN_GROUP_ID } = process.env;
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
          <Button
            onClick={handleTabEvents}
            currentTab={currentTab}
            className={
              currentTab == "Unassigned"
                ? "py-2 px-8 font-bold border-b-2"
                : "py-2 px-8"
            }
          >
            {" "}
            Unassigned{" "}
          </Button>
        )}

        <Button
          onClick={handleTabEvents}
          currentTab={currentTab}
          className={
            currentTab == "Completed"
              ? "py-2 px-8 font-bold border-b-2"
              : "py-2 px-8"
          }
        >
          {" "}
          Completed
        </Button>

        <Button
          onClick={handleTabEvents}
          currentTab={currentTab}
          className={
            currentTab == "Assigned"
              ? "py-2 px-8 font-bold border-b-2"
              : "py-2 px-8"
          }
        >
          {" "}
          Assigned{" "}
        </Button>

        <Button
          onClick={handleTabEvents}
          currentTab={currentTab}
          className={
            currentTab == "InProgress"
              ? "py-2 px-8 font-bold border-b-2"
              : "py-2 px-8"
          }
        >
          {" "}
          InProgress{" "}
        </Button>
      </div>
    </div>
  );
}
export default WriterDashBoardTabs;
