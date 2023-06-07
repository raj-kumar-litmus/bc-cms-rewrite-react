import * as msal from "@azure/msal-browser";
import properties from "../properties";

const { clientId, tenantId } = properties;
const msalConfig = {
  auth: {
    clientId,
    postLogoutRedirectUri: "https://bc-cms-rewrite-react.vercel.app/",
    authority: `https://login.microsoftonline.com/${tenantId}`
  }
};

let msalInstance;

const msalInitialize = async () => {
  msalInstance = new msal.PublicClientApplication(msalConfig);
  await msalInstance.initialize();
  return;
};

msalInitialize();

export default msalInstance;
