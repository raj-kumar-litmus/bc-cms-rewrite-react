import { useNavigate } from 'react-router-dom';

function ManualWorkFlowDashboard() {
    let navigate = useNavigate();

    return (
       <div className='bg-bg h-screen bg-bg'>
        <button onClick={()=> navigate(-1)} className="text-sm ml-12 px-1 py-1 font-bold" > 
         <span>{`<`}</span>
         <span> Back</span>
        </button>
        <div className="mt-4 text-center">
          <h1 className="text-xs font-bold leading-tight tracking-tight text-gray-900 md:text-xs dark:text-white">Create Workflows</h1>
          <p className="text-sm m-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <br/>eiusmod tempor incididunt ut labore et d</p>
          </div>
          
          <div className='m-10 mt-2'>
            <form className="flex">   
               <div className="w-full">
                 <input type="search" id="default-search" className="placeholder-text-bold w-full p-4 pl-10 text-sm text-gray-900 border border-borders-100 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Find Styles" required/>
               </div>
               <div className="m-0">
                 <button className="text-white bg-black py-3.5 px-4 rounded ml-2">Search</button>
                </div>
            </form>
            <div className='mt-6'>
            <div className="bg-danger-aler-bg border border-red text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="text-sm">Style DGET233 and FWPT1Y3 are doesn’t exist</span>
              <button>
                 <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                   <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
              </button>
            </div>
            </div>
          </div>
       </div>
    );
}
export default ManualWorkFlowDashboard;