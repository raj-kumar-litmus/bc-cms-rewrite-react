import React from 'react'
import Button from './Button';

function GlobalSearch({searchString}) {
    return (
          <form className="flex">  
            <input type="search" className="bg-white w-full h-[64px] items-center pl-[24px] text-sm placeholder-gray-20 rounded border border-grey-30 shadow" placeholder="Search by Style or Title or Brand"/>
            <Button className={"text-white bg-black h-[64px] w-[131px] rounded ml-2"}> {searchString} </Button>
  </form>
    );
  }
  export default GlobalSearch;
  