import React, { useEffect, useState } from "react";
import { EventType } from "@azure/msal-browser";
import { useNavigate } from "react-router-dom";
import msalInstance from "./authInitialize";
import useSessionStorage from "../hooks/useSessionStorage";
import Loader from "./loader";

function SSOLogin() {
  const navigate = useNavigate();
  const [accountDetails, setAccountDetails] = useState(null);
  const [userGroups, setUserGroups] = useSessionStorage("userGroups");
  const [userName, setUserName] = useSessionStorage("userName");

  useEffect(() => {
    if (accountDetails) {
      setUserGroups(accountDetails?.idTokenClaims?.groups);
      setUserName(accountDetails?.idTokenClaims?.name);
      navigate("/menuChooser");
    }
  }, [accountDetails]);

  useEffect(() => {
    // Set active acccount on page load
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      msalInstance.setActiveAccount(accounts[0]);
    }

    msalInstance.addEventCallback(
      (event) => {
        // set active account after redirect
        if (
          event.eventType === EventType.LOGIN_SUCCESS &&
          event.payload.account
        ) {
          const account = event.payload.account;
          msalInstance.setActiveAccount(account);
        }
      },
      (error) => {
        console.log("error", error);
      }
    );

    msalInstance
      .handleRedirectPromise()
      .then((authResult) => {
        // Check if user signed in
        const account = msalInstance.getActiveAccount();
        setAccountDetails(account);
        if (!account) {
          // redirect anonymous user to login page
          msalInstance.loginRedirect();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <Loader />;
}

export default SSOLogin;
