import React from 'react'
import Button from './Button';

function GlobalSearch({searchString, inputClasses, buttonClasses}) {
    return (
          <form className="flex">  
            <input type="search" className={inputClasses} placeholder="Search by Style or Title or Brand"/>
            <Button className={buttonClasses}> {searchString} </Button>
         </form>
    );
  }
  export default GlobalSearch;
  