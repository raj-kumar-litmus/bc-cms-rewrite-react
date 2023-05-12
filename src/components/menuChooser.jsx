import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import configurations from "../config";
import { useNavigate } from 'react-router-dom';
import NormalizationImg from '../logos/Normalization-img.svg';
import SizingAppImg from '../logos/SizingApp-img.svg';
import ChoosingAppArrow from '../logos/ChoosingApp-arrow.svg'

function MenuChooser() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [memberGroups, setGroups] = useState(['Data Normalization app','Sizing app']);
  const { azureUserGroups } = configurations[process.env.NODE_ENV];

  useEffect(() => {
    if (azureUserGroups && search) {
      const groups = new URLSearchParams(search).get("groups").split(",");
      const groupsToAccess = groups
        .filter((groupId) => !!azureUserGroups[groupId])
        .map((id) => azureUserGroups[id]);
      if (groupsToAccess) {
        // setGroups(groupsToAccess);
      }
    }
  }, [azureUserGroups, search]);


  return (
    <div className="text-center h-screen bg-bg">
      <h1 className="text-xs font-bold text-black md:text-xs pt-10">Choose the Application</h1>
      <p className="text-sm mt-4">You Have Permission to access Data Normalization and <br/>Sizing app. You can select one from below</p>
      <div className="flex flex-row justify-center items-center">
      
      {memberGroups.filter((item)=> item == "Data Normalization app").length == 1 && <div className="bg-white rounded-lg shadow dark:border md:m-10">
      <button onClick={()=> navigate('/normalizationDashBoard')}>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-4">
              <img
                 src={NormalizationImg}
                 alt="SizingAppImg SVG" />
          </div>
          <div>
          <h1 className="text-xs font-bold leading-tight tracking-tight text-gray-900 md:text-xs dark:text-white">Data Normalization App</h1>
          <p className="text-sm m-6">Lorem ipsum dolor sit amet, <br/>consectetur adipiscing</p>
          </div>

          <div className="bg-sky">
          <img
          className="bg-amber-300 ml-auto p-1"
              src={ChoosingAppArrow}
              alt="ChoosingAppArrow SVG" />
          </div>
          </button>
      </div>}

      {memberGroups.filter((item)=> item == "Sizing app").length == 1 && <div className="bg-white rounded-lg shadow dark:border md:m-10">
      <button onClick={()=> navigate('/sizing-app-dashBoard')}>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-4">
          <img
              src={SizingAppImg}
              alt="SizingAppImg SVG" />
          </div>

          <div>
          <h1 className="text-xs font-bold leading-tight tracking-tight text-gray-900 md:text-xs dark:text-white">Sizing App</h1>
          <p className="text-sm m-6">Lorem ipsum dolor sit amet, <br/>consectetur adipiscing</p>
          </div>

          <div className="bg-sky">
          <img
          className="bg-amber-300 ml-auto p-1"
              src={ChoosingAppArrow}
              alt="ChoosingAppArrow SVG" />
          </div>
           </button>
      </div>}
      <div>
      </div>
  </div>
      </div>
  );
}
export default MenuChooser;
