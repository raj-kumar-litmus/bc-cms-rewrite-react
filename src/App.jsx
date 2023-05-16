import React from 'react'
import BackcountryLogo from '../src/logos/BackCountry-logo.svg'
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen">
      <section className="bg-gray-50">
      <div className="bg-white rounded-lg shadow">
          <div className="flex justify-center items-center">
            <img src={BackcountryLogo} alt="Backcountry SVG" className='mt-6'/>
          </div>
                <div className="m-[40px]">
                    <div className="relative z-0 px-2 w-full p-4">
                      <button type="submit" data-testid="button-click" onClick={()=> navigate('/sso')} className="w-full text-white bg-black rounded font-medium text-sm px-5 py-2.5 text-center">Log in with SSO</button>
                    </div>
                </div>
          </div>
      </section>
    </div>
  );
}
export default App;
