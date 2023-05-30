const { VITE_SERVER_HOST_NAME: HOST_NAME } = process.env;

export const workFlowsUrl = `${HOST_NAME}/api/v1/workflows`;

export const status = {
  waitingForWriter: "WAITING_FOR_WRITER",
  assignedToWriter: "ASSIGNED_TO_WRITER",
  writingInProgress: "WRITING_IN_PROGRESS",
  writingComplete: "WRITING_COMPLETE",
  assignedToEditor: "ASSIGNED_TO_EDITOR",
  editingInProgress: "EDITING_IN_PROGRESS",
  editingComplete: "EDITING_COMPLETE"
};

export const limit = 999