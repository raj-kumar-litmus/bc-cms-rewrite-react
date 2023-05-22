import React, {useState, useEffect} from 'react';
import UnAssigned from "../logos/UnAssigned.svg";
import Assigned from "../logos/Assigned.svg";
import InProgress from "../logos/InProgress.svg";
import Completed from "../logos/Completed.svg";
import StatusBar from "./StatusBar";
import {workFlowsUrl} from '../constants/index'

function StatusBarsForNormalization({isAdmin}) {
  const [statusBarData, setStatusBarData] = useState([]);

 useEffect(() => {
        fetch(`${workFlowsUrl}/counts`,{
            method:"get",
           })
            .then(response => response.json())
            .then(result => setStatusBarData(result.data))
            .catch(error => (error));
    }, []);

  return (
    <div className={isAdmin? "grid grid-cols-4 gap-2" : "grid grid-cols-3 gap-2"}>
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
