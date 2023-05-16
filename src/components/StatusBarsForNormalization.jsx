import React from "react";
import UnAssigned from "../logos/UnAssigned.svg";
import Assigned from "../logos/Assigned.svg";
import InProgress from "../logos/InProgress.svg";
import Completed from "../logos/Completed.svg";
import StatusBar from "./StatusBar";

function StatusBarsForNormalization() {
  return (
    <div className="grid grid-cols-4 gap-2">
      <StatusBar
        title={"Unassigned"}
        img={UnAssigned}
        count={"250"}
        className="bg-unAssigned-bg rounded-full px-1 py-1 h-19 w-18"
      />

      <StatusBar
        title={"Assigned"}
        img={Assigned}
        count={"250"}
        className="bg-Assigned-bg rounded-full px-1 py-1 h-19 w-18"
      />

      <StatusBar
        title={"In-progress"}
        img={InProgress}
        count={"250"}
        className="bg-InProgress-bg rounded-full px-1 py-1 h-19 w-18"
      />

      <StatusBar
        title={"Completed"}
        img={Completed}
        count={"250"}
        className="bg-Completed-bg rounded-full px-1 py-1 h-19 w-18"
      />
    </div>
  );
}
export default StatusBarsForNormalization;
