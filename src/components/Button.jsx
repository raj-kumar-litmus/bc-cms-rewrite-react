
import React from 'react';

function Button({content, onClick, className, dataTestId}) {
  return (
             <button
               onClick={onClick}
               className={className}
               data-testid={dataTestId}
             >
              {content}
             </button>
  );
}
export default Button;
