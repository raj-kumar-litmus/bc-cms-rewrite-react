import React, { createContext, useState } from "react";

const DashBoardContext = createContext(undefined);

function DashBoardProvider({ children }) {
  const [workflowId, setWorkflowId] = useState(null);
  const [styleId, setStyleId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <DashBoardContext.Provider
      value={{
        workflowId,
        setWorkflowId,
        isModalVisible,
        setIsModalVisible,
        styleId,
        setStyleId
      }}
    >
      {children}
    </DashBoardContext.Provider>
  );
}

export { DashBoardProvider, DashBoardContext };
