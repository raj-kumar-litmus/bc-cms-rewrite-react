import React, { useState, useEffect, useContext} from "react";
import { DashBoardContext } from "../context/normalizationDashboard";
import UnAssigned from "../logos/UnAssigned.svg";
import Assigned from "../logos/Assigned.svg";
import InProgress from "../logos/InProgress.svg";
import Completed from "../logos/Completed.svg";
import StatusBar from "./StatusBar";
import { workFlowsUrl } from "../constants/index";

function StatusBarsForNormalization() {
  const [statusBarData, setStatusBarData] = useState([]);
  const { isAdmin, currentTab, setShowToast, setLoader, loader} = useContext(DashBoardContext);

  async function getCount(){
    try{
      const response = await fetch(`${workFlowsUrl}/counts`,
       {
        method: 'get',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
  );
  if(response?.ok){
    const data = await response.json();
    setLoader(false)
    setStatusBarData(data?.data);
   }else{
    setLoader(false)
    setShowToast(true)
   }
    }catch{
      console.error(error);
    }
  }

  useEffect(() => {
    setLoader(true)
    getCount()
  }, [currentTab]);

  return (
    <>
    <div
      className={isAdmin ? "grid grid-cols-4 gap-4" : "grid grid-cols-3 gap-4"}
    >
      {isAdmin && (
        <StatusBar
          title={"Unassigned"}
          img={UnAssigned}
          count={statusBarData?.unassigned}
          className="bg-pink-100"
          loader={loader}
        />
      )}

      <StatusBar
        title={"Assigned"}
        img={Assigned}
        count={statusBarData?.assigned}
        className="bg-blue-100"
        loader={loader}
      />

      <StatusBar
        title={"In-progress"}
        img={InProgress}
        count={statusBarData?.inProgress}
        className="bg-yellow-100"
        loader={loader}
      />

      <StatusBar
        title={"Completed"}
        img={Completed}
        count={statusBarData?.completed}
        className="bg-green-100"
        loader={loader}
      />
    </div>
    </>
  );
}
export default StatusBarsForNormalization;
