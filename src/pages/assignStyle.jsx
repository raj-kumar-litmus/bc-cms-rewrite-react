import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import BasicDropdown from "../components/BasicDropdown";
import WordBetweenHorizontalLine from "../components/WordBetweenHorizontalLine";
import Button from "../components/Button";
import CheckBox from "../components/CheckBox";

function AssignStyle({
  styles,
  isModalVisible,
  setIsModalVisible,
  setStyleAssigned,
  userGroup = "writers"
}) {
  const { VITE_SERVER_HOST_NAME } = process.env;
  const [options, setOptions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isActiveDropdown, setIsActiveDropdown] = useState(true);
  const [styleString, setStylesString] = useState([]);
  const [moreText, setMoreText] = useState(null);
  const [header, setHeader] = useState(null);
  const [uri, setUri] = useState(null);
  const [placeHolder, setPlaceHolder] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

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
        members?.map(({ displayName, id }) => ({
          value: id,
          label: displayName
        }))
      );
      setIsFetching(false);
      setIsActiveDropdown(true);
    } catch (_) {
      setIsFetching(false);
    }
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
  return (
    <Modal
      className={"w-[500px]  top-[-26%]"}
      visible={isModalVisible}
      setVisible={setIsModalVisible}
      header={<p className="text-xl font-semibold">{header}</p>}
    >
      <div className="text-base mb-[30px] flex">
        <p>
          {styleString}
          <span className={"font-bold text-gray-900"}> {moreText}</span>
        </p>
      </div>
      <BasicDropdown
        isLoading={isFetching}
        isDisabled={!isActiveDropdown || isFetching}
        options={options}
        hasCustomOption={true}
        isClearable={true}
        classNamePrefix="assign-writer"
        placeholder={placeHolder}
      />
      <div className="mt-[10px]">
        <WordBetweenHorizontalLine lineColor="bg-gray-300" text="Or" />
      </div>
      <div className="mt-[10px]">
        <CheckBox
          value={isChecked}
          inputClassName={"w-[18px] accent-gray-900"}
          onChange={() => {
            setIsChecked(!isChecked);
            setIsActiveDropdown(isChecked);
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
          onClick={setStyleAssigned}
          ariaLabel="Assign-Style"
          className={
            "bg-gray-900 border text-white rounded border-gray-800 w-[100px] h-[50px]"
          }
        >
          Save
        </Button>
      </div>
    </Modal>
  );
}

export default AssignStyle;
