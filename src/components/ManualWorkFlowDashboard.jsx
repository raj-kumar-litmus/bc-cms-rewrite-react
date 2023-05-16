import { useNavigate } from 'react-router-dom';

function ManualWorkFlowDashboard({backButtonString, testInsideTheAlert, SearchTest}) {
    let navigate = useNavigate();

    return (
       <div className='bg-bg h-screen bg-bg'>
        <button onClick={()=> navigate(-1)} className="text-sm ml-12 px-1 py-1 font-bold" > 
         <span>{backButtonString}</span>
        </button>
        <div className="mt-4 text-center">
          <h1 className="text-xs font-bold leading-tight tracking-tight text-gray-900">Create Workflows</h1>
          <p className="text-sm m-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <br/>eiusmod tempor incididunt ut labore et d</p>
          </div>
          
          <div className='m-10 mt-2'>
            <form className="flex">   
               <div className="w-full">
                 <input type="search" id="default-search" className="placeholder-text-bold w-full p-4 pl-10 text-sm text-gray-900 border border-borders-100 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Find Styles" required/>
               </div>
               <div className="m-0">
                 <button className="text-white bg-black py-3.5 px-4 rounded ml-2">{SearchTest}</button>
                </div>
            </form>
            <div className='mt-6'>
            <div className="bg-danger-aler-bg border border-red text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="text-sm"></span>
            </div>
            </div>
          </div>
       </div>
    );
}
export default ManualWorkFlowDashboard;