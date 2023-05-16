import React from 'react'
import UnAssigned from '../logos/UnAssigned.svg';
import Assigned from '../logos/Assigned.svg';
import InProgress from '../logos/InProgress.svg';
import Completed from '../logos/Completed.svg';
import StatusBarTail from './StatusBarTail';

function StatusBarsForNormalization() {
    return (
       <div className="grid grid-cols-4 gap-2">
          <div>
             <StatusBarTail
             title={"Unassigned"}
             img={UnAssigned}
             />
          </div>

          <div>
             <StatusBarTail
             title={"Assigned"}
             img={Assigned}
             />
          </div>

           <div>
             <StatusBarTail
             title={"In-progress"}
             img={InProgress}
             />
            </div>

          <div>
             <StatusBarTail
             title={"Completed"}
             img={Completed}
             />
            </div>
       </div>
    );
}
export default StatusBarsForNormalization