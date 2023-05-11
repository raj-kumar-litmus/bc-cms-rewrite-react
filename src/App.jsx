import { Link } from "react-router-dom";
import BackcountryLogo from '../src/logos/BackCountry-logo.svg'

function App() {
  const env = process.env.NODE_ENV;
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-center mx-auto md:h-screen">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="sm:p-8">
          <div className="flex justify-center items-center">
            <img src={BackcountryLogo} alt="Backcountry SVG"/>
          </div>
              <h1 className="flex mt-2 justify-center items-center text-xs font-bold leading-tight tracking-tight text-gray-900 md:text-xs dark:text-white">
                  Sign in
              </h1>
               <div className="m-[40px]">
      <p>
        <Link to="sso">Log in with SSO</Link>
        <p>Environment: {env}</p>
      </p>
    </div>
              {/* <form className="space-y-4 group" onSubmit={handleSubmit}>
              <div className="relative z-0 px-2 w-full">
                  <label for="userName" className={error ? "text-[11px] text-red bg-white relative px-1 top-2 left-3 w-auto group-focus-within:top-2" : userName !== "" ? "text-[11px] bg-white relative px-1 top-2 left-3 w-auto group-focus-within:top-2" : "text-[11px] bg-white relative px-1 top-2 left-3 w-auto group-focus-within:top-2 top-7"}>User Name</label>
                  <input data-testid="email-input" type="userName" name="userName" value={userName} id="userName" onChange={handleUserName} 
                  className={error? "border sm:text-sm rounded w-full p-2.5 outline-red": "border sm:text-sm rounded w-full p-2.5 focus:outline-border-color"} required=""/>
                  error mz label
                  <label for="userName" className="text-[11px] text-red ml-2">User Name</label>
              </div>
                  <div className="relative z-0 px-2 w-full">
                    <label for="password" className="text-[11px] bg-white relative px-1  top-2 left-3 w-auto group-focus-within:top-2 top-7">Password</label>
                    <input data-testid="password-input" type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="border sm:text-sm rounded w-full p-2.5 focus:outline-border-color" required=""/>
                  </div>
                  <div className="relative z-0 px-2 w-full">
                    <button type="submit" className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleSubmit}>Login</button>
                  </div>
              </form> */}
          </div>
      </div>
  </div>
</section>
    </div>
  );
}

export default App;
