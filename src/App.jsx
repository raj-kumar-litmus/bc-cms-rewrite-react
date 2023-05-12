import BackcountryLogo from '../src/logos/BackCountry-logo.svg'
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const env = process.env.NODE_ENV;
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-center mx-auto md:h-screen">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="sm:p-8">
          {/* <div className="flex justify-center items-center">
            <img src={BackcountryLogo} alt="Backcountry SVG"/>
          </div> */}
                <div className="m-[40px]">
                    <div className="relative z-0 px-2 w-full">
                      <button type="submit" onClick={()=> navigate('/sso')} className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log in with SSO</button>
                    </div>
                </div>
          </div>
      </div>
  </div>
</section>
    </div>
  );
}

export default App;
