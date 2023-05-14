import React from 'react'
function GlobalSearch() {
    return (
        <div className="grid grid-cols-1 gap-2">
      <div className='m-2'>
          <form className="flex">   
      <div className="w-full">
          <input type="search" id="default-search" className="placeholder-text-bold w-full p-4 pl-10 text-sm text-gray-900 border border-borders-100 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by Style or Title or Brand" required/>
      </div>
      <div className="m-0">
      <button className="text-white bg-black py-3.5 px-4 rounded ml-2">Search</button>
      </div>
  </form>
      </div>
      </div>
    );
  }
  export default GlobalSearch;
  