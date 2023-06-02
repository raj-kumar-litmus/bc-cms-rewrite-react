import React from 'react'
import Button from './Button';

function GlobalSearch({searchString, inputClasses, buttonClasses, onChange, onClick, value}) {
    return (
          <div className="flex">  
            <textarea value={value} className={inputClasses} rows="4" placeholder="Search by Style or Title or Brand" onChange={onChange}></textarea>
            <Button className={buttonClasses} onClick={onClick}> {searchString} </Button>
         </div>
    );
  }
  export default GlobalSearch;
  