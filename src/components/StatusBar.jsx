import React from 'react'
function StatusBarTail({img,title, count }) {
    return (
          <div className="justify-center items-center">
          <div className="bg-white rounded-lg shadow">
             <div className='flex flex-row'>
               <div className='mt-6 m-4'> 
                 <img
                  className="bg-unAssigned-bg rounded-full px-1 py-1 h-19 w-18"
                  src={img}
                  alt="Assigned SVG"/>   
               </div>
             <div className='m-3'>
             <p className="text-sm">{title}</p>
             <h2 className="font-bold text-xl">{count}</h2>
       </div>
      </div>
    </div> 
    </div>
    );
}
export default StatusBarTail