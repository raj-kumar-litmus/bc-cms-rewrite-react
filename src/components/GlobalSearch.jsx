import React from 'react'
import Button from './Button';

function GlobalSearch({searchString, className}) {
    return (
          <form className="flex">  
            <input type="search" className={className} placeholder="Search by Style or Title or Brand"/>
            <Button className={"text-white bg-black h-[64px] w-[131px] rounded ml-2"}> {searchString} </Button>
         </form>
    );
  }
  export default GlobalSearch;
  