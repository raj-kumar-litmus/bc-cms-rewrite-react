import * as msal from "@azure/msal-browser";

const { VITE_CLIENT_ID: clientId, VITE_TENANT_ID: tenantId } = import.meta.env;

const msalConfig = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`
  }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);
await msalInstance.initialize();

export default msalInstance;
