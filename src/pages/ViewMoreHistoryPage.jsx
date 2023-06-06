import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSessionStorage from "../hooks/useSessionStorage";
import DropDown from "../components/BasicDropdown";
import MultiSelectDropDown from "../components/DropDown";
import Button from "../components/Button";
import NavBar from "../components/NavBar";
import InputBox from "../components/InputBox";
import Textarea from "../components/InputTextarea";
import RichTextEditor from "../components/RichTextEditor";
import BackLogo from "../logos/chevron-down.svg";
import ViewHistoryModal from "../pages/ViewHistoryModal";

export default function StyleDetails({ quickFix = false, styleId }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [accountDetails] = useSessionStorage("accountDetails");
  const { quickFix: quickFixFromLink, styleId: styleIdFromQuickFix } =
    location.state || {};
  const quick = quickFixFromLink || quickFix;
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  useEffect(() => {
    if (!accountDetails?.idTokenClaims?.exp) {
      navigate("/");
    }
  }, [accountDetails]);

  const handleRecentHistory=()=>{
    setShowHistoryPopup(true)
  }

  const events = [
    {
      status: "15 hours ago David John has made some changes",
    },
    {
      status: "1 day ago Tom Sears has made some changes",
    },
    {
      status: "2 day ago Lionel Taurus has made some changes",
    },
    {
      status: "3 day ago Steven Neff has made some changes",
    },
    {
      status: "5 day ago David John has made some changes",
    },
    {
        status: "15 hours ago David John has made some changes",
      },
      {
        status: "1 day ago Tom Sears has made some changes",
      },
      {
        status: "2 day ago Lionel Taurus has made some changes",
      },
      {
        status: "3 day ago Steven Neff has made some changes",
      },
      {
        status: "5 day ago David John has made some changes",
      }
  ];

  const hanldeViewDetails=()=>{
    setShowHistoryPopup(false)
    navigate('/styleDetails')
  }

  return (
    <>
      <NavBar />
      <div className="mx-[50px] md:mx-[100px] lg:mx-[150px] mb-[200px] mt-[40px]">
        <p
          aria-label="navigate-back"
          className="flex cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <img src={BackLogo} alt="Go-Back Icon" />
          <span className="ml-[7px]"> Back</span>
        </p>
        <div className="border-solid border border-gray-300 rounded-xl pt-[50px] pb-[50px] px-[50px] mt-[20px]">
        <ol class="relative border-l border-[#2C2C2C] mt-[5%]">
          {events.map((item) => (
            <li class="mb-5 ml-4">
              <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.6 -left-1.5 border border-[#2C2C2C] bg-white"></div>
              <div className="flex justify-between">
                <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  {item.status}
                </p>
                <Button className="border border-[#1C1C1C] text-[#1C1C1C] rounded h-[30px] min-w-[106px] text-[13px] justify-end" onClick={hanldeViewDetails}>
                  View Details
                </Button>{" "}
              </div>
            </li>
          ))}
        </ol>
            
          <div className="mt-[40px] flex-column">
            <div className="flex justify-center mt-[50px]">
                <Button
                  className={
                    "bg-gray-900 border text-white rounded border-gray-800 w-[118px] h-[44px] text[14px]"
                  }
                >
                  Load more
                </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
