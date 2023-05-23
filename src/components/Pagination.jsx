import React from 'react';
import Button from './Button';

function pagination({customers, preText, nextText, currentPage, setCurrentPage}) {
  const pages = [];
  for(let i=1 ; i<=customers?.pagination?.pageCount; i++){
    pages.push(i);
  }
  const onPageChange= (pageNumber)=>{
    setCurrentPage(pageNumber.target.innerText);
  }
  const onPrevClick = ()=>{
    if(currentPage > 1)
      setCurrentPage(parseInt(currentPage)-1);
   }
  const onNextClick = ()=>{
    if(customers?.pagination?.pageCount-1){
        setCurrentPage(parseInt(currentPage) +1);
    }}

    return (
            <div className='mt-3 mb-3'>
             {pages.length >0 && 
              <nav className='flex justify-center items-center'>
               <Button className={"px-3 py-2 mr-2 leading-tight text-gray-500 bg-white"} onClick={onPrevClick}> {preText} </Button>
                 {pages?.map(item=>(
                   <Button className={item == currentPage ?  "px-3 py-2 mr-2 text-white bg-black border border-gray-300" : "px-3 py-2 mr-2 text-gray-500 bg-white border border-gray-300"} onClick={onPageChange}>{item}</Button>
                  ))}
                <Button className={"px-3 py-2 mr-2 leading-tight text-gray-500 bg-white"} onClick={onNextClick}> {nextText} </Button>
            </nav>}
            </div>
        )}
    export default pagination