import React from 'react';
import Button from './Button';

function Pagination({customers, preText, nextText, currentPage, setCurrentPage, className}) {
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
    if(customers?.pagination?.pageCount > currentPage ){
        setCurrentPage(parseInt(currentPage) +1);
    }}

    return (
            <div className='mt-3 mb-3'>
             {pages.length >0 && 
              <nav className='flex justify-center items-center'>
               <Button className={className} onClick={onPrevClick}> {preText} </Button>
                 {pages?.map(item=>(
                   <Button className={`px-3 py-2 mr-2 border border-gray-300 ${item == currentPage ? "text-white bg-black" : "text-gray-500 bg-white" }`} onClick={onPageChange}>{item}</Button>
                  ))}
                <Button className={className} onClick={onNextClick}> {nextText} </Button>
            </nav>}
            </div>
        )}
    export default Pagination