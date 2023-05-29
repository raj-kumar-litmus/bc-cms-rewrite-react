import React from 'react';

function TableHeaders({headerName, sortIcon, onClick, ArrowSort, currentSort}){
    return (
        <>
            <span className="mr-2">
                {headerName}
            </span>
            <span>
               <button onClick={onClick}>
                <img alt={`${sortIcon} svg`}  src={currentSort == headerName ?  sortIcon : ArrowSort}  />
                </button>
            </span>
        </>
    );
}export default TableHeaders