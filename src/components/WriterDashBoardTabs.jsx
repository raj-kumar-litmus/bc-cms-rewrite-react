import React from "react";
import Button from "./Button";

function WriterDashBoardTabs({ loader, handleTabEvents, currentTab, isAdmin}) {
  return (
    <div className="text-sm border-b border-grey-30">
      <div className="flex">
        {isAdmin && (
          <Button
            onClick={handleTabEvents}
            currentTab={currentTab}
            disabled={loader}
            className={
              currentTab == "Unassigned"
                ? "py-2 px-8 font-bold border-b-2 text-sm"
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
            currentTab == "Completed"
              ? "py-2 px-8 font-bold border-b-2 text-sm"
              : "py-2 px-8 text-sm"
          }
        >
          {" "}
          Completed
        </Button>

        <Button
          onClick={handleTabEvents}
          currentTab={currentTab}
          disabled={loader}
          className={
            currentTab == "Assigned"
              ? "py-2 px-8 font-bold border-b-2 text-sm"
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
            currentTab == "InProgress"
              ? "py-2 px-8 font-bold border-b-2 text-sm"
              : "py-2 px-8 text-sm"
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
