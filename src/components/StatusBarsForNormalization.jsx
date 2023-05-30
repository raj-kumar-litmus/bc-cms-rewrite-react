import React, { useState, useEffect, useContext, useRef } from "react";
import { Toast } from 'primereact/toast';
import { DashBoardContext } from "../context/normalizationDashboard";
import UnAssigned from "../logos/UnAssigned.svg";
import Assigned from "../logos/Assigned.svg";
import InProgress from "../logos/InProgress.svg";
import Completed from "../logos/Completed.svg";
import StatusBar from "./StatusBar";
import { workFlowsUrl } from "../constants/index";

function StatusBarsForNormalization() {
  const [statusBarData, setStatusBarData] = useState([]);
  const toast = useRef(null);
  const { isAdmin, currentTab, showToast, setShowToast } = useContext(DashBoardContext);

  async function getCount(){
    const response = await fetch(`${workFlowsUrl}/counts`,
       {
        method: 'get',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
  )
  const data = await response.json();
   if(data?.success){
    setStatusBarData(data?.data);
   }
  if (!data?.success){
    setShowToast(true)
	}
  }

  useEffect(() => {
    getCount()
  }, [currentTab]);

  useEffect(()=>{
    if(showToast){
      toast.current.show({severity:'error', summary: 'Error', detail:'Something went wrong. Please try again', life: 3000});
    }
  },[showToast])


  return (
    <div
      className={isAdmin ? "grid grid-cols-4 gap-4" : "grid grid-cols-3 gap-4"}
    >
      <div className="card flex justify-content-center">
            <Toast ref={toast} />
        </div>
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
