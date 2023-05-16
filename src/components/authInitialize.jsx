import * as msal from "@azure/msal-browser";

const { VITE_CLIENT_ID: clientId, VITE_TENANT_ID: tenantId } = process.env;

const msalConfig = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`
  }
};

let msalInstance;

const msalInitialize = async () => {
  msalInstance = new msal.PublicClientApplication(msalConfig);
  await msalInstance.initialize();
  return;
};

await msalInitialize();

export default msalInstance;
