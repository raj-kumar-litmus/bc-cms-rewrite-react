import { useNavigate } from 'react-router-dom';
import Button from './Button';

function ManualWorkFlowDashboard({backButtonString, alertText, searchTest, displayTest}) {
    let navigate = useNavigate();

    return (
       <div className='bg-bg h-screen' >
        <Button onClick={()=> navigate(-1)} className={"text-sm ml-12 px-1 py-1 font-bold"}> {backButtonString} </Button>
        <div className="mt-4 text-center">
          <h1 className="text-xs font-bold leading-tight tracking-tight text-gray-900">Create Workflows</h1>
          <p className="text-sm m-6">{displayTest}</p>
          </div>
          
          <div className='m-10 mt-2'>
            <form className="flex">   
               <div className="w-full">
                 <input type="search" id="default-search" className="placeholder-text-bold w-full p-4 pl-10 text-sm text-gray-900 border border-borders-100 rounded bg-gray-50" placeholder="Find Styles" required/>
               </div>
               <div className="m-0">
                 <Button onClick={()=> navigate(-1)} className="text-white bg-black py-3.5 px-4 rounded ml-2"> {searchTest} </Button>
                </div>
            </form>
            <div className='mt-6'>
            <div className="bg-danger-aler-bg border border-red text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="text-sm">{alertText}</span>
            </div>
            </div>
          </div>
       </div>
    );
}
export default ManualWorkFlowDashboard;