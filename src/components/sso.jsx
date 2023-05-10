/* eslint-disable indent */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable object-curly-newline */

import { useState, useEffect } from "react";
import { AzureAD, AuthenticationState } from "react-aad-msal";

import authProvider from "./authProvider";
import configurations from "../config";

function SSOLogin() {
  const [account, setAccountInfo] = useState(null);
  const { clientId, hostnameClient, tenantId } =
    configurations[process.env.NODE_ENV];

  // const getAccessToken = async () => {
  //   const token = await authProvider.getAccessToken();
  // };

  useEffect(() => {
    if (account) {
      const groups = account?.account?.idToken?.groups;
      if (!groups) {
        // oauth doesn't returns groups related information; call graph api to explicitly fetch the details;
        window.location.href = `/${tenantId}/oauth2/authorize?client_id=${clientId}&response_type=code&jwt=${account?.jwtIdToken}&redirect_uri=${hostnameClient}/redirect/web/&response_mode=query&state=12345`;
      }

      if (groups.length === 0) {
        // new page which says you dont have access to the app
        // or redirect elsewhere.
        window.location.href = "/";
      }

      if (groups?.length > 0) {
        // redirect to chooser page.
        window.location.replace(
          `${hostnameClient}/menuChooser?groups=${groups.toString()}`
        );
      }
    }
  }, [account, tenantId, clientId, hostnameClient]);

  return (
    <>
      {/* <AzureAD provider={authProvider}>
        <span>Only authenticated users can see me.</span>
      </AzureAD> */}

      <AzureAD provider={authProvider} forceLogin={true}>
        {({ login, logout, authenticationState, error, accountInfo }) => {
          setAccountInfo(accountInfo);
          switch (authenticationState) {
            case AuthenticationState.Authenticated:
              return (
                <p>
                  <span>{accountInfo?.jwtIdToken}</span>
                  <button type="button" onClick={logout}>
                    Logout
                  </button>
                  {/* <button type="button" onClick={getAccessToken}>GET access token</button> */}
                </p>
              );
            case AuthenticationState.Unauthenticated:
              return (
                <div>
                  {error && (
                    <p>
                      <span>
                        An error occured during authentication, please try
                        again!
                      </span>
                    </p>
                  )}
                  <p>
                    <span>Hey stranger, you look new!</span>
                    <button type="button" onClick={login}>
                      Login
                    </button>
                  </p>
                </div>
              );
            case AuthenticationState.InProgress:
              return <p>Authenticating...</p>;
            default:
              return <p>Something went wrong. Please try again.</p>;
          }
        }}
      </AzureAD>
    </>
  );
}

export default SSOLogin;
