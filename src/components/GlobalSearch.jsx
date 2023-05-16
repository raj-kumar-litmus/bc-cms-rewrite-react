import React from 'react'
import Button from './Button';

function GlobalSearch({searchString}) {
    return (
        <div className="grid grid-cols-1 gap-2">
      <div className='m-2'>
          <form className="flex">   
      <div className="w-full">
          <input type="search" id="default-search" className="placeholder-text-bold w-full p-4 pl-10 text-sm text-gray-900 border border-borders-100 rounded bg-gray-50" placeholder="Search by Style or Title or Brand" required/>
      </div>
      <div className="m-0">
        <Button className={"text-white bg-black py-3.5 px-4 rounded ml-2"}> {searchString} </Button>
      </div>
  </form>
      </div>
      </div>
    );
  }
  export default GlobalSearch;
  