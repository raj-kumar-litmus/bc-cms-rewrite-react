import {useState} from 'react';

function WriterDashBoardTabs() {
    const [currentTab, setCurrentTab] = useState("Unassigned")
    
    const handleTabEvents=(tab)=>{
        if(tab.target.innerText === "Unassigned"){
            debugger
            setCurrentTab("Unassigned")
        }
        if(tab.target.innerText === "Completed"){
            debugger
            setCurrentTab("Completed")
        }if(tab.target.innerText == "Assigned"){
            debugger
            setCurrentTab("Assigned")
        }if(tab.target.innerText == "InProgress"){
            debugger
            setCurrentTab("InProgress")
        }
    }

    return (
        <div class="text-sm border-b dark:border-bg">
    {/* <div class="flex">
        <button className="py-2 px-10 hover:font-bold hover:border-b-2 hover:border-transparent">
            Unassigned
        </button>
        
        <button className="py-2 px-10 hover:font-bold hover:border-b-2 hover:border-transparent">
            Completed
        </button>

        <button className="py-2 px-10 hover:font-bold hover:border-b-2 hover:border-transparent">
            Assigned
        </button>
        
        <button className="py-2 px-10 hover:font-bold hover:border-b-2 hover:border-transparent">
            InProgress
        </button>
    </div> */}
      <div class="flex">
        <button onClick={(e)=>handleTabEvents(e)} className={currentTab == "Unassigned"  ? "py-2 px-8 font-bold border-b-2" :  "py-2 px-8"}>
            Unassigned
        </button>
        
        <button onClick={(e)=>handleTabEvents(e)} className={currentTab == "Completed"  ? "py-2 px-8 font-bold border-b-2" :  "py-2 px-8"}>
            Completed
        </button>

        <button onClick={(e)=>handleTabEvents(e)} className={currentTab == "Assigned"  ? "py-2 px-8 font-bold border-b-2" :  "py-2 px-8"}>
            Assigned
        </button>
        
        <button onClick={(e)=>handleTabEvents(e)} className={currentTab == "InProgress"  ? "py-2 px-8 font-bold border-b-2" :  "py-2 px-8"}>
            InProgress
        </button>
    </div>
      </div> 
    );
  }
  export default WriterDashBoardTabs;
  