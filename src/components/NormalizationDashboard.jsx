import React from 'react'
import StatusBarsForNormalization from './StatusBarsForNormalization.jsx';
import GlobalSearch from './GlobalSearch.jsx';
import WriterDashBoardTabs from './WriterDashBoardTabs.jsx';
import Table from './Table'

function NormalizationDashboard() {
  return (
    <div className='bg-bg'>
       <div className='m-2'>
        <StatusBarsForNormalization/>
       </div>
       <div className='m-10'>
        <GlobalSearch
        serachString={"Search"}/>
       </div>
       <div className='m-10'>
        <WriterDashBoardTabs/>
       </div>
       <div className='m-10 mb-2'>
        <Table/>
       </div>
    </div>
  );
}
export default NormalizationDashboard;
