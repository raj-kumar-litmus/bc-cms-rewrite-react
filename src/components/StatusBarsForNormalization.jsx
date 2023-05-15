import React from 'react'
import UnAssigned from '../logos/UnAssigned.svg';
import Assigned from '../logos/Assigned.svg';
import InProgress from '../logos/InProgress.svg';
import Completed from '../logos/Completed.svg';

function StatusBarsForNormalization() {
    return (
       <div className="grid grid-cols-4 gap-2">
          <div className="justify-center items-center">
         <div className="bg-white rounded-lg shadow md:m-10">
        <div>
            <div className='flex flex-row'>
              <div className='mt-6 m-4'> 
                <img
                  className="bg-unAssigned-bg rounded-full px-1 py-1 h-19 w-18"
                  src={UnAssigned}
                  alt="Assigned SVG"/>   
               </div>
               <div className='m-3'>
                  <p className="text-sm">Unassigned</p>
                   <h2 className="font-bold text-xl">250</h2>
               </div>
            </div>
        </div>
      </div>
          </div>

          <div className="justify-center items-center">
         <div className="bg-white rounded-lg shadow md:m-10">
        <div>
        <div className='flex flex-row'>
              <div className='mt-6 m-4'> 
                <img
                  className="bg-Assigned-bg rounded-full px-1 py-1 h-19 w-18"
                  src={Assigned}
                  alt="Assigned SVG"/>   
               </div>
               <div className='m-3'>
                  <p className="text-sm">Assigned</p>
                   <h2 className="font-bold text-xl">168</h2>
               </div>
            </div>
        </div>
      </div>
          </div>

          
          <div className="justify-center items-center">
         <div className="bg-white rounded-lg shadow md:m-10">
        <div>
        <div className='flex flex-row'>
              <div className='mt-6 m-4'> 
                <img
                  className="bg-InProgress-bg rounded-full px-1 py-1 h-19 w-18"
                  src={InProgress}
                  alt="InProgress SVG"/>   
               </div>
               <div className='m-3'>
                  <p className="text-sm">In-progress</p>
                   <h2 className="font-bold text-xl">25</h2>
               </div>
            </div>
        </div>
      </div>
          </div>

          <div className="justify-center items-center">
         <div className="bg-white rounded-lg shadow md:m-10">
        <div>
        <div className='flex flex-row'>
              <div className='mt-6 m-4'> 
                <img
                  className="bg-Completed-bg rounded-full px-1 py-1 h-19 w-18"
                  src={Completed}
                  alt="Completed SVG"/>   
               </div>
               <div className='m-3'>
                  <p className="text-sm">Completed</p>
                   <h2 className="font-bold text-xl">180</h2>
               </div>
            </div>
        </div>
      </div>
          </div>

       </div>
    );
}
export default StatusBarsForNormalization