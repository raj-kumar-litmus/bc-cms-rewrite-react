import React, { useContext } from "react";
import { DashBoardContext } from "../context/normalizationDashboard";
import Button from "./Button";

function WriterDashBoardTabs({ handleTabEvents }) {
  const { loader, currentTab, isAdmin } = useContext(DashBoardContext);
  return (
    <div className="text-sm border-b">
      <div className="flex">
        {isAdmin && (
          <Button
            onClick={handleTabEvents}
            currentTab={currentTab}
            disabled={loader}
            className={
              currentTab == "Unassigned"
                ? "py-2 px-8 font-bold border-b-4 text-sm border-[#1C1C1C]"
                : "py-2 px-8 text-sm"
            }
          >
            {" "}
            Unassigned{" "}
          </Button>
        )}

        <Button
          onClick={handleTabEvents}
          currentTab={currentTab}
          disabled={loader}
          className={
            currentTab == "Assigned"
              ? "py-2 px-8 font-bold border-b-4 text-sm border-[#1C1C1C]"
              : "py-2 px-8 text-sm"
          }
        >
          {" "}
          Assigned{" "}
        </Button>

        <Button
          onClick={handleTabEvents}
          currentTab={currentTab}
          disabled={loader}
          className={
            currentTab == "In Progress"
              ? "py-2 px-8 font-bold border-b-4 text-sm border-[#1C1C1C]"
              : "py-2 px-8 text-sm"
          }
        >
          {" "}
          In Progress{" "}
        </Button>

        <Button
          onClick={handleTabEvents}
          currentTab={currentTab}
          disabled={loader}
          className={
            currentTab == "Completed"
              ? "py-2 px-8 font-bold border-b-4 text-sm border-[#1C1C1C]"
              : "py-2 px-8 text-sm"
          }
        >
          {" "}
          Completed
        </Button>
      </div>
    </div>
  );
}
export default WriterDashBoardTabs;
