import React from "react";
import { useNavigate } from "react-router-dom";

function MenuChooserAppDetails({
  disableButton = false,
  title,
  img,
  choosingAppArrow,
  displayContent
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow m-10 w-64">
      <button
        disabled={disableButton}
        onClick={() => navigate("/normalizationDashBoard")}
      >
        <div className="p-6 space-y-4">
          <img src={img} alt="SizingAppImg SVG" />
        </div>
        <div>
          <h1 className="text-xs font-bold leading-tight tracking-tight text-gray-900">
            {title}
          </h1>
          <p className="text-sm m-4 w-48">{displayContent}</p>
        </div>

        <div>
          <img
            className="ml-auto p-1"
            src={choosingAppArrow}
            alt="ChoosingAppArrow SVG"
          />
        </div>
      </button>
    </div>
  );
}
export default MenuChooserAppDetails;
