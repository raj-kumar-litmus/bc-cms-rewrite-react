import { useState } from 'react';
import BackcountryLogo from '../logos/backcountry-logo-with-text.svg';
import NavBarSwitchingIcon from '../logos/NavBarSwitchingIcon.svg';
import { useNavigate, useLocation } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPopup, setShowpopup] = useState(false)
    const handlPopup=()=>{
        setShowpopup(!showPopup)
    }

    return (
    <nav className="bg-white mt-2 mb-2">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
    <div className="flex items-center ml-15">
    <img 
       className="ml-8 px-1 py-1 h-26 w-147"
       src={BackcountryLogo} alt="Backcountry SVG"/>
    </div>
        <div className="flex items-center mr-10">
           {location.pathname !== '/menuChooser' && (<div className='mr-2'>
            <button onClick={()=> navigate('/manualWorkFlowDashboard')}> 
                <button> 
                <div className="bg-black text-white text-sm rounded-full border h-8 w-8 px-1 py-1"> + </div>  
            </button>
            </button>
            </div>)}
       
            {location.pathname !== '/menuChooser' && (<div className='mr-2'>
             <button> 
                <img
                  className="px-1 py-1 h-31 w-31"
                  src={NavBarSwitchingIcon}
                  alt="NavBarSwitchingIcon SVG"/>   
             </button>
           </div>)}

           <div className='mr-2'>
            <button onClick={handlPopup}> 
                <div className="bg-white text-black text-sm rounded-full border h-8 w-8 px-1 py-1 font-bold">D</div>  
            </button>
            </div>
                 {showPopup && 
                <div className='relative right-14 top-4'> 
                  <div className="bg-white shadow dark:border absolute text-center w-auto h-auto">
                 <div className='m-2'>
                  <div className='mb-1'>
                     <button> 
                        <div className="bg-white font-bold text-black text-sm rounded-full border h-6 w-6">D</div>  
                     </button>
                  </div>
                  
                  <div className='mb-1'>
                    <p className="text-sm font-semibold">David John</p>
                  </div>

                  <div>
                  <button> 
                    <div className="bg-white text-black text-sm rounded border m-2 p-1">Logout</div>  
                  </button>
                  </div>
                  </div>
                </div>
            </div>
            }
        </div>
    </div>
</nav>
    );
}
export default NavBar;