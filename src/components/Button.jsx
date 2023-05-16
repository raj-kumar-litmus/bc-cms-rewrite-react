
import React from 'react';

function Button({onClick, className, dataTestId, children}) {
  return (
             <button
               onClick={onClick}
               className={className}
               data-testid={dataTestId}
             >
              {children}
             </button>
  );
}
export default Button;
