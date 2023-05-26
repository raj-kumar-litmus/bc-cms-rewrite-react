import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSessionStorage from "../hooks/useSessionStorage";
import WriterInterfaceImg from "../logos/WriterInterfaceImg.svg";
import SizingAppImg from "../logos/sizing-app-chooser.svg";
import ChoosingAppArrow from "../logos/ChoosingApp-arrow.svg";
import MenuChooserAppDetails from "./MenuChooserAppDetails";

const {
  VITE_SIZING_GROUP_NAME: SIZING_APP_GROUP_NAME,
  VITE_ADMIN_GROUP_NAME: ADMIN_GROUP_NAME,
  VITE_WRITER_GROUP_NAME: WRITER_GROUP_NAME,
  VITE_EDITOR_GROUP_NAME: EDITOR_GROUP_NAME
} = process.env;

function MenuChooser() {
  const [canAccessSizingApp, setAccessSizingApp] = useState(false);
  const [canAccessWorkBenchApp, setAccessWorkBenchApp] = useState(false);
  const [groups] = useSessionStorage("userGroups");
  const [accountDetails] = useSessionStorage("accountDetails");
  const navigate = useNavigate();

  useEffect(() => {
    setAccessSizingApp(groups?.includes(SIZING_APP_GROUP_NAME));
    setAccessWorkBenchApp(
      groups?.includes(ADMIN_GROUP_NAME) ||
        groups?.includes(WRITER_GROUP_NAME) ||
        groups?.includes(EDITOR_GROUP_NAME)
    );
  }, [groups, setAccessSizingApp, setAccessWorkBenchApp]);

  useEffect(() => {
    if (!accountDetails?.idTokenClaims?.exp) {
      navigate("/");
    }
  }, [accountDetails]);

  return (
    <div className="bg-grey-40 h-screen">
      <h1 className="text-[20px] text-center font-bold text-black pt-10">
        Choose the Application
      </h1>

      {canAccessWorkBenchApp && canAccessSizingApp && (
        <p className="text-sm mt-4 text-center w-[416px] mx-[476px]">
          You Have Permission to access Data Normalization and
          Sizing app. You can select one from below
        </p>
       )}

      <div className="flex flex-row justify-center items-center">
        {canAccessWorkBenchApp && (
          <MenuChooserAppDetails
            img={WriterInterfaceImg}
            title={"Writer InterFace App"}
            choosingAppArrow={ChoosingAppArrow}
            onClick={() => navigate("/normalizationDashBoard")}
            displayContent={"Lorem ipsum dolor sit amet,consectetur adipiscing"}
          />
        )}

        {/* {canAccessSizingApp && ( */}
          <MenuChooserAppDetails
            disableButton={true}
            img={SizingAppImg}
            title={"Sizing App"}
            choosingAppArrow={ChoosingAppArrow}
            displayContent={"Lorem ipsum dolor sit amet,consectetur adipiscing"}
          />
        {/* )} */}
      </div>
    </div>
  );
}
export default MenuChooser;
