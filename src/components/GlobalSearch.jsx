import React from 'react'
import Button from './Button';

function GlobalSearch({searchString, inputClasses, buttonClasses}) {
    return (
          <div className="flex">  
            <input className={inputClasses} placeholder="Search by Style or Title or Brand"/>
            <Button className={buttonClasses}> {searchString} </Button>
         </div>
    );
  }
  export default GlobalSearch;
  