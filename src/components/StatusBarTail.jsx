import React from 'react'
function StatusBarTail(props) {
    return (
          <div className="justify-center items-center">
          <div className="bg-white rounded-lg shadow md:m-10">
             <div className='flex flex-row'>
               <div className='mt-6 m-4'> 
                 <img
                  className="bg-unAssigned-bg rounded-full px-1 py-1 h-19 w-18"
                  src={props.img}
                  alt="Assigned SVG"/>   
               </div>
             <div className='m-3'>
             <p className="text-sm">{props.title}</p>
             <h2 className="font-bold text-xl">250</h2>
       </div>
      </div>
    </div> 
    </div>
    );
}
export default StatusBarTail