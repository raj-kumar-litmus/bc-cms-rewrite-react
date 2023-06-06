import React, { useEffect, useRef } from "react";
import Select, { components } from "react-select";

const { ValueContainer, Placeholder } = components;

const CustomValueContainer = ({ children, ...props }) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, (child) =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  );
};

const CustomOption = (props) => {
  return (
    <components.Option {...props}>
      <span
        className="before:h-[30px] before:text-[#2C2C2C] before:w-[30px] before:border before:rounded-[50%] before:bg-white before:border-gray-800 before:inline-block before:pl-[9px] before:pt-[1px] before:mr-[12px] before:content-[attr(data-test)]"
        data-test={props.data.label[0]}
        data-testid="test-id"
        key={props.innerProps.key}
      >
        {props.data.label}
      </span>
    </components.Option>
  );
};

const DropDown = ({
  placeholder,
  id,
  label,
  onChange,
  defaultValue,
  options,
  isDisabled,
  isLoading,
  hasCustomOption,
  isClearable,
  clearValue = false,
  setClearValue,
  classNamePrefix = "",
  isMulti = false
}) => {
  const selectRef = useRef(null);
  const tempStyles = {
    container: (provided, state) => ({
      ...provided,
      marginTop: 25
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      overflow: "visible"
    }),
    placeholder: (provided, state) => ({
      ...provided,
      display: state.hasValue ? "none" : "block",
      position: "absolute",
      top: state.hasValue || state.selectProps.inputValue ? -25 : "15%",
      left: "0%",
      transition: "top 0.1s, font-size 0.1s",
      fontSize: (state.hasValue || state.selectProps.inputValue) && 11
    })
  };

  useEffect(() => {
    if (clearValue) {
      selectRef.current.clearValue();
      setClearValue(false);
    }
  }, [clearValue]);

  const props = {
    isClearable,
    id,
    placeholder: `Select ${placeholder}`,
    "aria-label": "dropdown",
    isSearchable: true,
    isDisabled,
    onChange,
    ref: selectRef,
    isLoading,
    defaultValue,
    blurInputOnSelect: true,
    isMulti,
    classNamePrefix,
    options,
    styles: { ...tempStyles }
  };

  const dropdown = hasCustomOption ? (
    <Select
      {...props}
      components={{
        ValueContainer: CustomValueContainer,
        Option: CustomOption
      }}
    />
  ) : (
    <Select
      {...props}
      components={{
        ValueContainer: CustomValueContainer
      }}
    />
  );
  return (
    <>
      <span className="text-[10px] ml-[12px] relative top-[10px] z-[1] bg-white color-gray-100">
        {label || placeholder}
      </span>
      {dropdown}
    </>
  );
};

export default DropDown;
