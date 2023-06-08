import React, { useEffect, useState, useContext, useRef } from "react";
import { Toast } from "primereact/toast";
import { DashBoardContext } from "../context/normalizationDashboard";
import Modal from "../components/Modal";
import DropDown from "../components/BasicDropdown";
import WordBetweenHorizontalLine from "../components/WordBetweenHorizontalLine";
import Button from "../components/Button";
import CheckBox from "../components/CheckBox";
import GreenTick from "../logos/green-tick.svg";
import RedCross from "../logos/red-cross-in-circle.svg";
import useSessionStorage from "../hooks/useSessionStorage";
import Loader from "../components/loader";
import { properties } from "../properties";

function AssignStyle() {
  const toastBR = useRef(null);
  const { serverHostName } = properties;
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
  const [toastAssignee, setToastAssignee] = useState(null);
  const [assigneeName, SetAssigneeName] = useState(null);
  const [styleAssigned, setStyleAssigned] = useState(false);
  const [assignee, SetAssignee] = useState(null);
  const [errorToast, setErrorToast] = useState(false);
  const [clearValue, setClearValue] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [accountDetails] = useSessionStorage("accountDetails");
  const [userEmail] = useSessionStorage("userEmail");
  const {
    assigneeType: userGroup,
    workflowId,
    styleId: styles,
    setStyleId,
    currentTab,
    setCurrentTab,
    setCurrentPage,
    isModalVisible,
    setShowFilters,
    clearFilters,
    workflowCount,
    selectAll,
    appliedFilters,
    setSelectedProducts,
    setIsModalVisible
  } = useContext(DashBoardContext) || {};

  const buildStyleStrings = () => {
    if (selectAll) {
      setStylesString(styles.join(", "));
      if (styles.length !== workflowCount) {
        setMoreText(`+${workflowCount - styles.length} More`);
      }
    } else {
      if (styles.length < 10) {
        setStylesString(styles.join(", "));
        setMoreText("");
      } else {
        const remaining = styles.length - 9;
        setStylesString(`${styles.splice(0, 9).join(", ")}`);
        setMoreText(`+${remaining} More`);
      }
    }
  };

  const fetchUserId = async () => {
    const requestOptions = {
      method: "GET"
    };
    try {
      const response = await fetch(uri, requestOptions);
      const { data } = await response.json();
      setOptions(
        data?.map(({ displayName, mail }) => ({
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

  const styleAssignedHandler = ({ styleId, assignee, error = false }) => {
    setStyleId(styleId);
    setToastAssignee(assignee);
    setStyleAssigned(true);
    setErrorToast(error);
  };

  const assignStyleToUser = async () => {
    const body = selectAll
      ? JSON.stringify({
          filters: appliedFilters,
          assignments: {
            [userGroup === "writers" ? "writer" : "editor"]: assignee
          }
        })
      : JSON.stringify({
          filters: {
            id: workflowId
          },
          assignments: {
            [userGroup === "writers" ? "writer" : "editor"]: assignee
          }
        });
    const requestOptions = {
      method: "PATCH",
      body,
      headers: {
        "Content-type": "application/json"
      }
    };
    try {
      setIsFetching(true);
      const uri = `${serverHostName}/api/v1/workflows/assign?email=${userEmail}`;
      const { status } = (await fetch(uri, requestOptions)) || {};
      styleAssignedHandler({
        error: status != 200,
        styleId: styles,
        assignee: assigneeName
      });
      setIsModalVisible(false);
      setShowLoader(false);
      setIsFetching(false);
      setCurrentPage(1);
      setSelectedProducts([]);
      setShowFilters(false);
      clearFilters();
      if (currentTab === "Assigned") {
        setCurrentTab("default");
        setTimeout(() => {
          setCurrentTab("Assigned");
        }, 100);
      } else {
        setCurrentTab("Assigned");
      }
      return;
    } catch (err) {
      styleAssignedHandler({
        styleId: styles,
        error: true,
        assignee: assigneeName
      });
      setIsModalVisible(false);
      setShowLoader(false);
      setIsFetching(false);
      return;
    }
  };

  const setSelfAsAssignee = () => {
    const { username, name } = accountDetails || {};
    SetAssignee(username);
    SetAssigneeName(name);
    setToastAssignee(name);
  };

  useEffect(() => {
    if (userGroup === "writers") {
      setHeader("Assign Writer for");
      setUri(`${serverHostName}/api/v1/groups/writers/members`);
      setPlaceHolder("Writer");
    }
    if (userGroup === "editors") {
      setHeader("Assign Editor for");
      setUri(`${serverHostName}/api/v1/groups/editors/members`);
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
    if (Array.isArray(styles) && styles.length > 0) buildStyleStrings();
  }, [styles]);

  useEffect(() => {
    setIsFetching(!options.length > 0);
    setIsActiveDropdown(options.length > 0);
  }, [isModalVisible, options]);

  useEffect(() => {
    if (!isChecked && !assignee && !assigneeName) {
      setDisableSubmit(true);
    }
    if (isChecked || assignee || assigneeName) {
      setDisableSubmit(false);
    }
  }, [isChecked, assignee, assigneeName]);

  const onSubmitHandler = async () => {
    setShowLoader(true);
    await assignStyleToUser();
  };

  const Summary = () => {
    return (
      <div className="flex h-full items-center">
        {!errorToast && (
          <img src={GreenTick} className="h-[28px]" alt="GreenTick" />
        )}
        {errorToast && (
          <img src={RedCross} className="h-[28px]" alt="RedCross" />
        )}
        <div className="flex flex-col ml-[20px]">
          <p className="font-bold">
            {errorToast ? "Something went wrong !" : "Succesfully Assigned"}
          </p>
          <p>
            {errorToast
              ? `Please refresh the page or try again later`
              : `${toastAssignee} assigned as the ${userGroup} for ${styles}`}
          </p>
        </div>
      </div>
    );
  };

  const showTopCenter = () => {
    toastBR.current.show({
      severity: errorToast ? "error" : "success",
      content: <Summary />,
      sticky: true
    });
    setStyleAssigned(false);
  };

  const selfAssignHandler = () => {
    setIsChecked(!isChecked);
    setIsActiveDropdown(isChecked);
    setClearValue(true);
    setSelfAsAssignee();
  };

  useEffect(() => {
    if (styleAssigned) {
      showTopCenter();
    }
  }, [styleAssigned]);

  return (
    <>
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
                if (e) {
                  SetAssignee(e.value);
                  SetAssigneeName(e.label);
                }
              }}
              isDisabled={!isActiveDropdown || isFetching}
              options={options}
              clearValue={clearValue}
              setClearValue={setClearValue}
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
                onChange={selfAssignHandler}
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
                disabled={disableSubmit}
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
      <Toast ref={toastBR} position="top-center" />
    </>
  );
}

export default AssignStyle;
