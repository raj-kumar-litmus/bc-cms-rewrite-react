/* eslint-disable no-unused-vars */

import { MsalAuthProvider, LoginType } from "react-aad-msal";
import regeneratorRuntime from "regenerator-runtime";
import configurations from "../config";

const { clientId, hostnameClient, tenantId } =
  configurations[process.env.NODE_ENV];

// Msal Configurations
const config = {
  auth: {
    authority: `https://login.microsoftonline.com/${tenantId}`,
    clientId,
    redirectUri: hostnameClient
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true
  }
};

// Authentication Parameters
const authenticationParameters = {
  scopes: [
    "user.read",
    "offline_access",
    "profile",
    "openid",
    "https://rajkumartestingorg.onmicrosoft.com/f7fdabfa-274a-4401-852d-b448a62f70d6/Users.read",
    "https://rajkumartestingorg.onmicrosoft.com/f7fdabfa-274a-4401-852d-b448a62f70d6/Group.read",
    "https://rajkumartestingorg.onmicrosoft.com/f7fdabfa-274a-4401-852d-b448a62f70d6/Group.Read.All"
  ]
};

// Options
const options = {
  loginType: LoginType.Redirect,
  tokenRefreshUri: `${window.location.origin}/auth.html`
};

// export const authProvider = new MsalAuthProvider(
//   config,
//   authenticationParameters,
//   options
// );

export default new MsalAuthProvider(config, authenticationParameters, options);
