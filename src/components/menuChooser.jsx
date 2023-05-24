import React, { useState, useEffect } from "react";
import useSessionStorage from "../hooks/useSessionStorage";
import NormalizationImg from "../logos/Normalization-img.svg";
import SizingAppImg from "../logos/SizingApp-img.svg";
import ChoosingAppArrow from "../logos/ChoosingApp-arrow.svg";
import MenuChooserAppDetails from "./MenuChooserAppDetails";
const {
  VITE_SIZING_APP_GROUP_ID: SIZING_APP_GROUP_NAME,
  VITE_ADMIN_GROUP_NAME: ADMIN_GROUP_NAME,
  VITE_WRITER_GROUP_NAME: WRITER_GROUP_NAME,
  VITE_EDITOR_GROUP_NAME: EDITOR_GROUP_NAME
} = process.env;

function MenuChooser() {
  const [canAccessSizingApp, setAccessSizingApp] = useState(false);
  const [canAccessWorkBenchApp, setAccessWorkBenchApp] = useState(false);
  const [groups] = useSessionStorage("userGroups");

  useEffect(() => {
    setAccessSizingApp(groups?.includes(SIZING_APP_GROUP_NAME));
    setAccessWorkBenchApp(
      groups?.includes(ADMIN_GROUP_NAME) ||
        groups?.includes(WRITER_GROUP_NAME) ||
        groups?.includes(EDITOR_GROUP_NAME)
    );
  }, [groups, setAccessSizingApp, setAccessWorkBenchApp]);

  return (
    <div className="bg-grey-40 h-screen text-center">
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
          <MenuChooserAppDetails
            img={NormalizationImg}
            title={"Writer InterFace App"}
            choosingAppArrow={ChoosingAppArrow}
            displayContent={"Lorem ipsum dolor sit amet,consectetur adipiscing"}
          />
        )}

        {canAccessSizingApp && (
          <MenuChooserAppDetails
            img={SizingAppImg}
            title={"Sizing App"}
            choosingAppArrow={ChoosingAppArrow}
            displayContent={"Lorem ipsum dolor sit amet,consectetur adipiscing"}
          />
        )}
      </div>
    </div>
  );
}
export default MenuChooser;
