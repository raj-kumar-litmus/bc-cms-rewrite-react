import React from "react";

function Button({
  onClick,
  ariaLabel,
  className,
  dataTestId,
  children,
  disabled = false
}) {
  return (
    <button
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      className={className}
      data-testid={dataTestId}
    >
      {children}
    </button>
  );
}
export default Button;
