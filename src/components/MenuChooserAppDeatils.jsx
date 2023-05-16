import React from "react";
import { useNavigate } from "react-router-dom";

function MenuChooserTail({title, img, ChoosingAppArrow, DisplayContent}) {
    const navigate = useNavigate();

  return (
          <div className="bg-white rounded-lg shadow m-10">
            <button onClick={() => navigate("/normalizationDashBoard")}>
              <div className="p-6 space-y-4">
                <img src={img} alt="SizingAppImg SVG" />
              </div>
              <div>
                <h1 className="text-xs font-bold leading-tight tracking-tight text-gray-900">
                    {title}
                </h1>
                <p className="text-sm m-6">
                {DisplayContent}
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
  );
}
export default MenuChooserTail;
