import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSessionStorage from "../hooks/useSessionStorage";
import NormalizationImg from "../logos/Normalization-img.svg";
import SizingAppImg from "../logos/SizingApp-img.svg";
import ChoosingAppArrow from "../logos/ChoosingApp-arrow.svg";
import MenuChooserTail from "./MenuChooserAppDeatils";
const {
  VITE_SIZING_APP_GROUP_ID: SIZING_APP_GROUP_ID,
  VITE_DATA_NORMALIZATION_GROUP_ID: DATA_NORMALIZATION_GROUP_ID
} = process.env;

function MenuChooser() {
  const navigate = useNavigate();
  const [canAccessSizingApp, setAccessSizingApp] = useState(false);
  const [canAccessWorkBenchApp, setAccessWorkBenchApp] = useState(false);
  const [groups] = useSessionStorage("userGroups");

  useEffect(() => {
    setAccessSizingApp(groups?.includes(SIZING_APP_GROUP_ID));
    setAccessWorkBenchApp(groups?.includes(DATA_NORMALIZATION_GROUP_ID));
  }, [groups, setAccessSizingApp, setAccessWorkBenchApp]);

  return (
    <div className="text-center h-screen bg-bg">
      <h1 className="text-xs font-bold text-black pt-10">
        Choose the Application
      </h1>
      
      {canAccessWorkBenchApp && canAccessSizingApp && (
        <p className="text-sm mt-4">
          You Have Permission to access Data Normalization and <br />
          Sizing app. You can select one from below
        </p>
      )}

      <div className="flex flex-row justify-center items-center">
        {canAccessWorkBenchApp && (
          <MenuChooserTail
          img={NormalizationImg}
          title={"Writer Interphase App"}
          ChoosingAppArrow={ChoosingAppArrow}
          DisplayContent={<div>Lorem ipsum dolor sit amet,<br/>consectetur adipiscing</div>}
          />
        )}

        {canAccessSizingApp && (
          <MenuChooserTail
          img={SizingAppImg}
          title={"Sizing App"}
          ChoosingAppArrow={ChoosingAppArrow}
          DisplayContent={<div>Lorem ipsum dolor sit amet,<br/>consectetur adipiscing</div>}
          />
        )}
      </div>
    </div>
  );
}
export default MenuChooser;
