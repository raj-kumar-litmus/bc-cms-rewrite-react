const { VITE_SERVER_HOST_NAME: HOST_NAME } = process.env;

export const workFlowsUrl = `${HOST_NAME}/api/v1/workflows`;
