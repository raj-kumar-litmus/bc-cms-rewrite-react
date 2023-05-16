import React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackcountryLogo from '../logos/backcountry-logo-with-text.svg';
import NavBarSwitchingIcon from '../logos/NavBarSwitchingIcon.svg';
import useSessionStorage from "../hooks/useSessionStorage";
import Button from './Button';

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPopup, setShowpopup] = useState(false)
    const [name] = useSessionStorage("userName");
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
                <Button dataTestId="manualflow-button" onClick={()=> navigate('/manualWorkFlowDashboard')} content={<div className="bg-black text-white text-sm rounded-full border h-8 w-8 px-1 py-1"> + </div>}/>
            </div>)}
       
            {location.pathname !== '/menuChooser' && (<div className='mr-2'>
            <Button  content={<img
                  className="px-1 py-1 h-31 w-31"
                  src={NavBarSwitchingIcon}
                  alt="NavBarSwitchingIcon SVG"/>}/>
           </div>)}

           <div className='mr-2'>
            <Button  onClick={handlPopup} content={<div className="bg-white text-black text-sm rounded-full border h-8 w-8 px-1 py-1 font-bold">{name?.charAt(0)}</div>}/>
            </div>
                 {showPopup && 
                <div className='relative right-14 top-4'> 
                  <div className="bg-white shadow absolute text-center w-auto h-auto">
                 <div className='m-2'>
                  <div className='mb-1'>
                  <Button  dataTestId={show-popup-button} onClick={handlPopup} content={<div className="bg-white font-bold text-black text-sm rounded-full border h-6 w-6">{name?.charAt(0)}</div>}/>
                  </div>
                  
                  <div className='mb-1'>
                    <p className="text-sm font-semibold">{name}</p>
                  </div>

                  <div>
                    <Button className={className} content={Logout}/>
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