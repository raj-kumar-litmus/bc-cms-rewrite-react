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
    <nav className="bg-white mt-2 mb-2 shadow-lg shadow-gray-200 h-[70px] flex flex-wrap">
      <div className="flex items-center ml-[10%]">
        <img
          className="ml-8 px-1 py-1 h-26 w-147"
          src={BackcountryLogo}
          alt="Backcountry SVG"
        />
      </div>

      <div className="flex items-center ml-[56%] space-x-8">
        {location.pathname !== "/menuChooser" && (
          <>
            <Button
              dataTestId="manualflow-button"
              onClick={() => navigate("/manualWorkFlowDashboard")}
            >
              <div className="bg-black text-white text-2xl rounded-full border h-12 w-12">
                {" "}
                +{" "}
              </div>
            </Button>

            <Button>
              <img
                className="px-1 py-1 h-31 w-31"
                src={NavBarSwitchingIcon}
                alt="NavBarSwitchingIcon SVG"
              />
            </Button>
          </>
        )}

        <Button onClick={handlPopup}>
          <div className="bg-white text-black text-xl font-normal rounded-full border h-12 w-12 px-1 py-1.5 font-bold">
            {name?.charAt(0)}
          </div>
        </Button>

        {showPopup && (
          <div className="relative right-14 top-4">
            <div className="bg-white shadow absolute text-center w-auto h-auto">
              <div className="m-2">
                <div className="mb-1">
                  <Button
                    dataTestId={show - popup - button}
                    onClick={handlPopup}
                  >
                    <div className="bg-white font-bold text-black text-sm rounded-full border h-6 w-6">
                      {name?.charAt(0)}
                    </div>
                  </Button>
                </div>

                <div className="mb-1">
                  <p className="text-sm font-semibold">{name}</p>
                </div>

                <div>
                  <Button onClick={signOut} className={className}>
                    Logout{" "}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
export default NavBar;
