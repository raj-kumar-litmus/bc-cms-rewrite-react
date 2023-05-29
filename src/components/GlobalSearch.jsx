import React from 'react'
import Button from './Button';

function GlobalSearch({searchString, inputClasses, buttonClasses, onChange, onClick, value}) {
    return (
          <div className="flex">  
            <input className={inputClasses} value={value} placeholder="Search by Style or Title or Brand" onChange={onChange}/>
            <Button className={buttonClasses} onClick={onClick}> {searchString} </Button>
         </div>
    );
  }
  export default GlobalSearch;
  