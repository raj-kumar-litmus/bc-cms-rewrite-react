import React from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";

function ViewHistoryModal({ showHistoryPopup, setShowHistoryPopup }) {
    const navigate = useNavigate();

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
    }
  ];

  const footerContent = () => {
    return (
      <div className="flex justify-center">
        <Button
          onClick={handleViewMoreHistory}
          className={
            "bg-gray-900 border text-white rounded border-gray-800 !w-[165px] h-[39px] !mb-[30px]"
          }
        >
          View more history
        </Button>
      </div>
    );
  };

  const hanldeViewDetails=()=>{
    setShowHistoryPopup(false)
    navigate('/styleDetails')
  }

  const handleViewMoreHistory=()=>{
    setShowHistoryPopup(false)
    navigate('/viewMoreHistory')
  }

  return (
    <>
      <Modal
        className={"w-[600px] rounded-full"}
        visible={showHistoryPopup}
        setVisible={setShowHistoryPopup}
      >
        <>
        <p className="text-[18px] !pt-[10px] text-[#2C2C2C] text-center font-semibold">{"History"}</p>
        <ol class="relative border-l border-[#2C2C2C] mt-[5%]">
          {events.map((item) => (
            <li class="mb-5 ml-4">
              <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.6 -left-1.5 border border-[#2C2C2C] bg-white"></div>
              <div className="flex justify-between">
                <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400 w-[330px] text-[14px]">
                  {item.status}
                </p>
                <Button className="border border-[#1C1C1C] text-[#1C1C1C] rounded h-[30px] w-[106px] text-[13px] justify-end" onClick={hanldeViewDetails}>
                  View Details
                </Button>{" "}
              </div>
            </li>
          ))}
        </ol>
        <div className="flex justify-center">
        <Button
          onClick={handleViewMoreHistory}
          className={
            "bg-gray-900 border text-white rounded border-gray-800 !w-[165px] h-[39px] !mb-[30px]"
          }
        >
          View more history
        </Button>
      </div>
        </>
      </Modal>
    </>
  );
}
export default ViewHistoryModal;
