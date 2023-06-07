/* eslint-disable no-unused-vars */

import { MsalAuthProvider, LoginType } from "react-aad-msal";
import regeneratorRuntime from "regenerator-runtime";
import { properties } from "../properties";

const { clientId, tenantId } = properties;

// Msal Configurations
const config = {
  auth: {
    authority: `https://login.microsoftonline.com/${tenantId}`,
    clientId
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true
  }
};

// Authentication Parameters
const authenticationParameters = {
  scopes: ["user.read", "offline_access", "profile", "openid"]
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
