import React from 'react';

function TableHeaders({headerName, sortIcon, onClick}){
    return (
        <>
            <span className="mr-2">
                {headerName}
            </span>
            <span>
               <button onClick={onClick}>
                <img alt={`${sortIcon} svg`}  src={sortIcon}  />
                </button>
            </span>
        </>
    );
}export default TableHeaders