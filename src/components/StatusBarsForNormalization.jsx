import React, { useState, useEffect, useContext } from "react";
import { DashBoardContext } from "../context/normalizationDashboard";
import UnAssigned from "../logos/UnAssigned.svg";
import Assigned from "../logos/Assigned.svg";
import InProgress from "../logos/InProgress.svg";
import Completed from "../logos/Completed.svg";
import StatusBar from "./StatusBar";
import { workFlowsUrl } from "../constants/index";

function StatusBarsForNormalization() {
  const [statusBarData, setStatusBarData] = useState([]);

  const { isAdmin } = useContext(DashBoardContext);

  useEffect(() => {
    fetch(`${workFlowsUrl}/counts`, {
      method: "get"
    })
      .then((response) => response.json())
      .then((result) => setStatusBarData(result.data))
      .catch((error) => error);
  }, []);

  return (
    <div
      className={isAdmin ? "grid grid-cols-4 gap-4" : "grid grid-cols-3 gap-4"}
    >
      {isAdmin && (
        <StatusBar
          title={"Unassigned"}
          img={UnAssigned}
          count={statusBarData?.unassigned}
          className="bg-pink-100"
        />
      )}

      <StatusBar
        title={"Assigned"}
        img={Assigned}
        count={statusBarData?.assigned}
        className="bg-blue-100"
      />

      <StatusBar
        title={"In-progress"}
        img={InProgress}
        count={statusBarData?.inProgress}
        className="bg-yellow-100"
      />

      <StatusBar
        title={"Completed"}
        img={Completed}
        count={statusBarData?.completed}
        className="bg-green-100"
      />
    </div>
  );
}
export default StatusBarsForNormalization;
