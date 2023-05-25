import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackcountryLogo from "../logos/backcountry-logo-with-text.svg";
import NavBarSwitchingIcon from "../logos/NavBarSwitchingIcon.svg";
import useSessionStorage from "../hooks/useSessionStorage";
import Button from "./Button";
import msalInstance from "./authInitialize";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowpopup] = useState(false);
  const [name] = useSessionStorage("userName");
  const handlPopup = () => {
    setShowpopup(!showPopup);
  };

  const [groups] = useSessionStorage("userGroups");
  const [isAdmin, setIsAdmin] = useState(false);
  const { VITE_ADMIN_GROUP_ID: ADMIN_GROUP_ID } = process.env;

  useEffect(() => {
    setIsAdmin(groups?.includes(ADMIN_GROUP_ID));
  }, [ADMIN_GROUP_ID, setIsAdmin]);


  const signOut = () => {
    msalInstance
      .logoutRedirect()
      .then((_) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav className="bg-[#FFFFFF] bg-op rounded shadow shadow-grey-70 border-b border-grey-30">
    <div className="flex flex-wrap justify-between items-center mx-[5%] h-[70px]">
      <div className="flex items-center">
        <img src={BackcountryLogo} alt="Backcountry SVG" />
      </div>
      <div className="flex">
        {(location.pathname !== "/menuChooser"  && isAdmin)&& (
          <div className="flex flex-row">
            <div className="mr-2">
              <Button
                dataTestId="manualflow-button"
                onClick={() => navigate("/manualWorkFlowDashboard")}
              >
                <div className="bg-black text-white text-sm rounded-full border h-8 w-8 px-1 py-1">
                  {" "}
                  +{" "}
                </div>
              </Button>
            </div>
            {/* switching App icon commented for now */}
            {/* <div className="mr-2">
              <Button>
                <img
                  className="px-1 h-31 w-31"
                  src={NavBarSwitchingIcon}
                  alt="NavBarSwitchingIcon SVG"
                />
              </Button>
            </div> */}
          </div>
        )}

        <div className="mr-2">
          <Button onClick={handlPopup}>
            <div className="bg-white text-black text-sm rounded-full border border-[#2C2C2C] h-8 w-8 px-1 py-1 font-bold">
              {name?.charAt(0)}
            </div>
          </Button>
        </div>
        {showPopup && (
          <div className="relative right-[185px] top-[52px]">
            <div className="bg-white shadow absolute text-center w-[172px] h-[190px]">
              <div className="m-2">
                <div className="mb-1">
                  <Button
                    dataTestId={"show-popup-button"}
                    // onClick={handlPopup}
                  >
                    <div className="bg-white font-bold flex text-[18px] justify-center items-center text-[#2C2C2C] rounded-full border h-[54px] w-[54px]">
                      {name?.charAt(0)}
                    </div>
                  </Button>
                </div>

                <div className="mb-1">
                  <p className="text-[18px] text-[#2C2C2C] font-bold">{name}</p>
                </div>

                <div>
                  <Button
                    onClick={signOut}
                    className={
                      "bg-white text-black text-sm rounded border m-2 p-1 w-[94px] h-[39px]"
                    }
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </nav>
  );
}
export default NavBar;
