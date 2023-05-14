import React from 'react'
import {useState} from 'react';

function WriterDashBoardTabs() {
    const [currentTab, setCurrentTab] = useState("Unassigned")

    const handleTabEvents=(tab)=>{
        if(tab.target.innerText === "Unassigned"){
            setCurrentTab("Unassigned")
        }
        if(tab.target.innerText === "Completed"){
            setCurrentTab("Completed")
        }if(tab.target.innerText === "Assigned"){
            setCurrentTab("Assigned")
        }if(tab.target.innerText === "InProgress"){
            setCurrentTab("InProgress")
        }
    }

    return (
        <div class="text-sm border-b dark:border-bg">
      <div class="flex">
        <button data-testid="Unassigned" onClick={(e)=>handleTabEvents(e)} className={currentTab == "Unassigned"  ? "py-2 px-8 font-bold border-b-2" :  "py-2 px-8"}>
            Unassigned
        </button>
        
        <button data-testid="Completed" onClick={(e)=>handleTabEvents(e)} className={currentTab == "Completed"  ? "py-2 px-8 font-bold border-b-2" :  "py-2 px-8"}>
            Completed
        </button>

        <button data-testid="Assigned" onClick={(e)=>handleTabEvents(e)} className={currentTab == "Assigned"  ? "py-2 px-8 font-bold border-b-2" :  "py-2 px-8"}>
            Assigned
        </button>
        
        <button data-testid="InProgress" onClick={(e)=>handleTabEvents(e)} className={currentTab == "InProgress"  ? "py-2 px-8 font-bold border-b-2" :  "py-2 px-8"}>
            InProgress
        </button>
    </div>
      </div> 
    );
  }
  export default WriterDashBoardTabs;
  