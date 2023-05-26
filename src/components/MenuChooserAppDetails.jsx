import React from "react";

function MenuChooserAppDetails({
  title,
  img,
  choosingAppArrow,
  displayContent,
  onClick
}) {

  return (
    <div className="bg-white rounded-lg shadow m-10">
      <button onClick={onClick} className="w-[260px] px-[17px]">
        <div className="pt-[16px]">
          <img src={img} alt="SizingAppImg SVG"/>
        </div>
        <div className="text-left">
          <h1 className="text-[16px] font-bold text-[#2C2C2C] text-['Aktiv Grotesk'] w-[180px] mt-[20px]">
            {title}
          </h1>
          <p className="text-sm  text-left font-['Aktiv Grotesk'] text-[#4D4D4D] w-[193px] mt-[7px]">{displayContent}</p>
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
