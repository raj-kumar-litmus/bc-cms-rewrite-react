import StatusBarsForNormalization from './StatusBarsForNormalization.jsx';
import GlobalSearch from './GlobalSearch.jsx';
import WriterDashBoardTabs from './WriterDashBoardTabs.jsx'

function NormalizationDashboard() {
  return (
    <div className='bg-bg h-screen bg-bg'>
       <div className='m-2'>
        <StatusBarsForNormalization/>
       </div>
       <div className='m-10 mt-2'>
        <GlobalSearch/>
       </div>
       <div className='m-10 mt-2'>
        <WriterDashBoardTabs/>
       </div>
    </div>
   
  );
}
export default NormalizationDashboard;
