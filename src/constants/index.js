import { properties } from "../properties";

export const workFlowsUrl = `${properties.serverHostName}/api/v1/workflows`;

export const status = {
  waitingForWriter: "WAITING_FOR_WRITER",
  assignedToWriter: "ASSIGNED_TO_WRITER",
  writingInProgress: "WRITING_IN_PROGRESS",
  writingComplete: "WRITING_COMPLETE",
  assignedToEditor: "ASSIGNED_TO_EDITOR",
  editingInProgress: "EDITING_IN_PROGRESS",
  editingComplete: "EDITING_COMPLETE"
};

export const statusForUi = {
  WAITING_FOR_WRITER: "Waiting For Writer",
  ASSIGNED_TO_WRITER: "Assigned To Writer",
  WRITING_IN_PROGRESS: "Writing In Progress",
  WRITING_COMPLETE: "Writing Complete",
  ASSIGNED_TO_EDITOR: "Assigned To Editor",
  EDITING_IN_PROGRESS: "Editing In Progress",
  EDITING_COMPLETE: "Editing Complete"
};

export const limit = 999;
