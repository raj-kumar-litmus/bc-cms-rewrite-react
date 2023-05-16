import React from "react";
import { useNavigate } from "react-router-dom";

function MenuChooserTail(props) {
    const navigate = useNavigate();

  return (
          <div className="bg-white rounded-lg shadow md:m-10">
            <button onClick={() => navigate("/normalizationDashBoard")}>
              <div className="p-6 space-y-4 md:space-y-6 sm:p-4">
                <img src={props.img} alt="SizingAppImg SVG" />
              </div>
              <div>
                <h1 className="text-xs font-bold leading-tight tracking-tight text-gray-900 md:text-xs">
                    {props.title}
                </h1>
                <p className="text-sm m-6">
                  Lorem ipsum dolor sit amet, <br />
                  consectetur adipiscing
                </p>
              </div>

              <div className="bg-sky">
                <img
                  className="bg-amber-300 ml-auto p-1"
                  src={props.ChoosingAppArrow}
                  alt="ChoosingAppArrow SVG"
                />
              </div>
            </button>
          </div>
  );
}
export default MenuChooserTail;
