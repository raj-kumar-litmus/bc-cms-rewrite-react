import React from "react";
import { Editor } from "primereact/editor";

export default function RichTextEditor({
  label,
  val,
  onChange,
  className,
  labelClassName,
  isReadOnly = false
}) {
  const COLOR_CODES = [
    "#e60000",
    "#ff9900",
    "#ffff00",
    "#008a00",
    "#0066cc",
    "#9933ff",
    "#ffffff",
    "#facccc",
    "#ffebcc",
    "#ffffcc",
    "#cce8cc",
    "#cce0f5",
    "#ebd6ff",
    "#bbbbbb",
    "#f06666",
    "#ffc266",
    "#ffff66",
    "#66b966",
    "#66a3e0",
    "#c285ff",
    "#888888",
    "#a10000",
    "#b26b00",
    "#b2b200",
    "#006100",
    "#0047b2",
    "#6b24b2",
    "#444444",
    "#5c0000",
    "#663d00",
    "#666600",
    "#003700",
    "#002966",
    "#3d1466"
  ];

  const renderHeader = () => {
    return (
      <span className="ql-formats !flex justify-evenly">
        <select
          className="ql-background !w-[35px]"
          defaultValue={COLOR_CODES?.[0]}
        >
          <option></option>
          {COLOR_CODES.map((colorCode) => (
            <option value={colorCode} key={colorCode}></option>
          ))}
        </select>
        <select className="ql-color !w-[35px]" defaultValue={COLOR_CODES?.[0]}>
          <option></option>
          {COLOR_CODES.map((colorCode) => (
            <option value={colorCode} key={colorCode}></option>
          ))}
        </select>
        <select className="ql-header"></select>
        <button
          className="!w-[80px] ql-bold ml-[10px]"
          aria-label="Bold"
        ></button>
        <button className="!w-[80px] ql-italic" aria-label="Italic"></button>
        <button
          className="!w-[80px] ql-underline"
          aria-label="Underline"
        ></button>
        <button className="!w-[80px] ql-strike" aria-label="Strike"></button>
        <button
          type="button"
          className="!w-[80px] ql-list"
          value="ordered"
          aria-label="Ordered List"
        ></button>
        <button
          type="button"
          className="!w-[80px] ql-list"
          value="bullet"
          aria-label="Unordered List"
        ></button>
        <button
          type="button"
          className="!w-[80px] ql-blockquote"
          aria-label="Block Quote"
        ></button>
        <button
          type="button"
          className="!w-[80px] ql-code-block"
          aria-label="Insert Code Block"
        ></button>
        <button
          type="button"
          className="!w-[80px] ql-link"
          aria-label="Insert Link"
        ></button>
        <button
          type="button"
          className="!w-[80px] ql-image"
          aria-label="Insert Image"
        ></button>
        <select className="ql-align !w-[35px]"></select>
      </span>
    );
  };

  const header = renderHeader();

  return (
    <>
      <label className={labelClassName} htmlFor={label}>
        {label}
      </label>
      <Editor
        className={className}
        readOnly={isReadOnly}
        value={val}
        headerTemplate={header}
        onTextChange={(e) => onChange(e.textValue)}
      />
    </>
  );
}
