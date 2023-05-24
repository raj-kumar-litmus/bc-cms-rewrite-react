import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import DropDown from "../components/BasicDropdown";
import WordBetweenHorizontalLine from "../components/WordBetweenHorizontalLine";
import Button from "../components/Button";
import CheckBox from "../components/CheckBox";
import useSessionStorage from "../hooks/useSessionStorage";
import Loader from "../components/loader";

function AssignStyle({
  styles,
  workflowId,
  isModalVisible,
  setIsModalVisible,
  setStyleAssigned,
  userGroup = "writers"
}) {
  const { VITE_SERVER_HOST_NAME } = process.env;
  const [options, setOptions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isActiveDropdown, setIsActiveDropdown] = useState(true);
  const [styleString, setStylesString] = useState([]);
  const [moreText, setMoreText] = useState(null);
  const [header, setHeader] = useState(null);
  const [uri, setUri] = useState(null);
  const [placeHolder, setPlaceHolder] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [assignee, SetAssignee] = useState(null);
  const [assigneeName, SetAssigneeName] = useState(null);
  const [accountDetails] = useSessionStorage("accountDetails");

  const buildStyleStrings = () => {
    if (styles.length < 10) {
      setStylesString(styles.join(", "));
    } else {
      const remaining = styles.length - 9;
      setStylesString(`${styles.splice(0, 9).join(", ")}`);
      setMoreText(`+${remaining} More`);
    }
  };

  const fetchUserId = async () => {
    const requestOptions = {
      method: "GET"
    };
    try {
      const response = await fetch(uri, requestOptions);
      const data = await response.json();
      const { members } = data || {};
      setOptions(
        members?.map(({ displayName, mail }) => ({
          value: mail,
          label: displayName
        }))
      );
      setIsFetching(false);
      setIsActiveDropdown(true);
    } catch (_) {
      setIsFetching(false);
    }
  };

  const assignStyleToUser = async () => {
    const requestOptions = {
      method: "PATCH",
      body: JSON.stringify({
        [userGroup === "writers" ? "writer" : "editor"]: assignee
      }),
      headers: {
        "Content-type": "application/json"
      }
    };
    try {
      setIsFetching(true);
      const uri = `${VITE_SERVER_HOST_NAME}/api/v1/workflows/${workflowId}`;
      const response = await fetch(uri, requestOptions);
      const { status } = response;
      setStyleAssigned({
        error: status !== 200,
        styleId: styles,
        assignee: assigneeName,
        userGroup: placeHolder
      });
      setShowLoader(false);
      setIsFetching(false);
      return;
    } catch (_) {
      setStyleAssigned({
        styleId: styles,
        error: true,
        assignee: assigneeName,
        userGroup: placeHolder
      });
      setShowLoader(false);
      setIsFetching(false);
      return;
    }
  };

  const setSelfAsAssignee = () => {
    const { username, name } = accountDetails || {};
    SetAssignee(username);
    SetAssigneeName(name);
  };

  useEffect(() => {
    if (userGroup === "writers") {
      setHeader("Assign Writer for");
      setUri(`${VITE_SERVER_HOST_NAME}/api/v1/groupMembers/all/writers`);
      setPlaceHolder("Writer");
    }
    if (userGroup === "editors") {
      setHeader("Assign Editor for");
      setUri(`${VITE_SERVER_HOST_NAME}/api/v1/groupMembers/all/editors`);
      setPlaceHolder("Editor");
    }
  }, [userGroup]);

  useEffect(() => {
    (async () => {
      if (uri) {
        await fetchUserId();
      }
    })();
  }, [uri]);

  useEffect(() => {
    setIsFetching(true);
    setIsActiveDropdown(false);
    buildStyleStrings();
  }, []);

  const onSubmitHandler = async () => {
    setShowLoader(true);
    await assignStyleToUser();
  };

  return (
    <Modal
      className={"w-[500px]"}
      visible={isModalVisible}
      setVisible={setIsModalVisible}
      header={<p className="text-xl font-semibold">{header}</p>}
    >
      {!showLoader && (
        <>
          <div className="text-base mb-[5px] flex">
            <p>
              {styleString}
              <span className={"font-bold text-gray-900"}> {moreText}</span>
            </p>
          </div>
          <DropDown
            id="single-option-dropdown"
            label={`Assign ${userGroup === "writers" ? "Writer" : "Editor"}`}
            isLoading={isFetching}
            onChange={(e) => {
              SetAssignee(e.value);
              SetAssigneeName(e.label);
            }}
            isDisabled={!isActiveDropdown || isFetching}
            options={options}
            hasCustomOption={true}
            isClearable={true}
            classNamePrefix="assign-writer"
            placeholder={placeHolder}
          />
          <div className="mt-[25px]">
            <WordBetweenHorizontalLine lineColor="bg-gray-300" text="Or" />
          </div>
          <div className="mt-[10px]">
            <CheckBox
              value={isChecked}
              inputClassName={"w-[18px] accent-gray-900"}
              onChange={() => {
                setIsChecked(!isChecked);
                setIsActiveDropdown(isChecked);
                setSelfAsAssignee();
              }}
              text={"Assign Me"}
            />
          </div>
          <div className="flex justify-center mt-[30px]">
            <Button
              onClick={() => setIsModalVisible(false)}
              ariaLabel="Hide-Assign-Modal"
              className={
                "border rounded border-gray-800 w-[100px] h-[50px] mr-[20px]"
              }
            >
              Cancel
            </Button>
            <Button
              onClick={onSubmitHandler}
              ariaLabel="Assign-Style"
              className={
                "bg-gray-900 border text-white rounded border-gray-800 w-[100px] h-[50px]"
              }
            >
              Save
            </Button>
          </div>
        </>
      )}
      {showLoader && <Loader className={"!h-[330px]"} />}
    </Modal>
  );
}

export default AssignStyle;
