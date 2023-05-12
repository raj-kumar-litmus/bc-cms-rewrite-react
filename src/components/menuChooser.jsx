import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import configurations from "../config";
import NormalizationImg from "../logos/Normalization-img.svg";
import SizingAppImg from "../logos/SizingApp-img.svg";
import ChoosingAppArrow from "../logos/ChoosingApp-arrow.svg";
import useSessionStorage from "../hooks/useSessionStorage";

function MenuChooser() {
  const navigate = useNavigate();
  const [memberGroups, setGroups] = useState([
    "Data Normalization app",
    "Sizing app"
  ]);
  const { azureUserGroups } = configurations[process.env.NODE_ENV];
  const [name] = useSessionStorage("userName");
  const [groups] = useSessionStorage("userGroups");

  useEffect(() => {
    if (azureUserGroups) {
      console.log("groups");
      console.log(groups);
      const groupsToAccess = groups
        ?.filter((groupId) => !!azureUserGroups[groupId])
        .map((id) => azureUserGroups[id]);
      if (groupsToAccess) {
        // setGroups(groupsToAccess);
      }
    }
  }, [azureUserGroups]);

  console.log("memberGroups1>>", memberGroups);
  console.log(
    "memberGroups>>",
    memberGroups.filter((item) => item == "Sizing app")
  );

  return (
    <div className="text-center h-screen bg-bg">
      <h1 className="text-xs font-bold leading-tight tracking-tight text-gray-900 md:text-xs dark:text-white pt-10">
        Choose the Application
      </h1>
      <p>Username : {name}</p>
      <p className="text-sm mt-4">
        You Have Permission to access Data Normalization and <br />
        Sizing app. You can select one from below
      </p>
      <div className="flex flex-row justify-center items-center">
        {memberGroups.filter((item) => item == "Data Normalization app")
          .length == 1 && (
          <div className="bg-white rounded-lg shadow dark:border md:m-10">
            <button onClick={() => navigate("/normalizationDashBoard")}>
              <div className="p-6 space-y-4 md:space-y-6 sm:p-4">
                <img src={NormalizationImg} alt="SizingAppImg SVG" />
              </div>
              <div>
                <h1 className="text-xs font-bold leading-tight tracking-tight text-gray-900 md:text-xs dark:text-white">
                  Data Normalization App
                </h1>
                <p className="text-sm m-6">
                  Lorem ipsum dolor sit amet, <br />
                  consectetur adipiscing
                </p>
              </div>

              <div className="bg-sky">
                <img
                  className="bg-amber-300 ml-auto p-1"
                  src={ChoosingAppArrow}
                  alt="ChoosingAppArrow SVG"
                />
              </div>
            </button>
          </div>
        )}

        {memberGroups.filter((item) => item == "Sizing app").length == 1 && (
          <div className="bg-white rounded-lg shadow dark:border md:m-10">
            <button onClick={() => navigate("/sizing-app-dashBoard")}>
              <div className="p-6 space-y-4 md:space-y-6 sm:p-4">
                <img src={SizingAppImg} alt="SizingAppImg SVG" />
              </div>

              <div>
                <h1 className="text-xs font-bold leading-tight tracking-tight text-gray-900 md:text-xs dark:text-white">
                  Sizing App
                </h1>
                <p className="text-sm m-6">
                  Lorem ipsum dolor sit amet, <br />
                  consectetur adipiscing
                </p>
              </div>

              <div className="bg-sky">
                <img
                  className="bg-amber-300 ml-auto p-1"
                  src={ChoosingAppArrow}
                  alt="ChoosingAppArrow SVG"
                />
              </div>
            </button>
          </div>
        )}
        <div></div>
      </div>
    </div>
  );
}
export default MenuChooser;
