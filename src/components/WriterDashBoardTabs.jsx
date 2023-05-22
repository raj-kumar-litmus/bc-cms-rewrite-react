import React from "react";
import Button from "./Button";

function WriterDashBoardTabs({handleTabEvents, currentTab, isAdmin}) {
 
  return (
    <div className="text-sm border-b border-grey-30">
      <div className="flex">
        {isAdmin && (
          <Button
            onClick={handleTabEvents}
            currentTab={currentTab}
            className={
              currentTab == "Unassigned"
                ? "py-2 px-8 font-bold border-b-2 text-[14px]"
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
              ? "py-2 px-8 font-bold border-b-2 text-[14px]"
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
              ? "py-2 px-8 font-bold border-b-2 text-[14px]"
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
              ? "py-2 px-8 font-bold border-b-2 text-[14px]"
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
