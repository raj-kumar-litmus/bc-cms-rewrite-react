

import React from 'react';

function TabsDetails({tabName, handleTabEvents, currentTab}) {
  return (
         <div>
             <button
               onClick={(e) => handleTabEvents(e)}
               className={
                 currentTab == tabName
                   ? "py-2 px-8 font-bold border-b-2"
                   : "py-2 px-8"
               }
             >
              {tabName}
             </button>
          </div>
  );
}
export default TabsDetails;
