import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DashBoardContext } from "../context/normalizationDashboard";
import Edit from "../logos/Edit.svg";
import AssignToEditor from "../logos/AssignToEditor.svg";
import AssignToWriter from "../logos/AssignToWriter.svg";

function MoreIcon({ rowData }) {
  const { setWorkflowId, setStyleId, setIsModalVisible, setAssigneeType } =
    useContext(DashBoardContext);
  const navigate = useNavigate();
  const handleQuickFix = () => {
    navigate(`/styleDetails?styleId=${rowData?.styleId}`, {
      state: {
        quickFix: true
      }
    });
  };
  const handleAssignToWriter = () => {
    setStyleId([rowData?.styleId]);
    setIsModalVisible(true);
    setAssigneeType("writers");
    setWorkflowId([rowData?.id]);
  };
  const handleAssignToEditor = () => {
    setStyleId([rowData?.styleId]);
    setIsModalVisible(true);
    setAssigneeType("editors");
    setWorkflowId([rowData?.id]);
  };
  return (
    <div className="bg-white shadow text-center w-[180px] z-10">
      <div className="grid grid-row-3 gap-4 ">
        <button className="flex shadow" onClick={handleQuickFix}>
          <span className="bg-white flex rounded-full justify-center items-center border w-[30px] h-[30px] border-grey-30 mr-1">
            <img alt={`Edit svg`} src={Edit} />
          </span>
          <span className="text-[14px]">Quick Fix</span>
        </button>

        <button className="flex shadow" onClick={handleAssignToWriter}>
          <span className="bg-white flex rounded-full justify-center items-center border w-[30px] h-[30px] border-grey-30 mr-1">
            <img alt={`AssignToWriter svg`} src={AssignToWriter} />
          </span>
          <span className="text-[14px]">Assign To Writer</span>
        </button>

        <button className="flex shadow" onClick={handleAssignToEditor}>
          <span className="bg-white flex rounded-full justify-center items-center border w-[30px] h-[30px] border-grey-30 mr-1">
            <img alt={`AssignToEditor svg`} src={AssignToEditor} />
          </span>
          <span className="text-[14px]">Assign To Editor</span>
        </button>
      </div>
    </div>
  );
}
export default MoreIcon;
