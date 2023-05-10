/* eslint-disable no-console */

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import configurations from "../config";

// if the JWT token from Azure (on login) doesn't contain the group claims,
// then we will call our back-end api which will generate a oauth token,
// using which we will invoke MS Graph api to member group details of the logged in user.

// This method (Token) will be invoked to generate token and get the usergroup details.
// On succesfull completion, this will redirect to the menu-chooser page.

function Token() {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [memberGroups, setMemberGroups] = useState(null);
  const { search } = useLocation();

  const { msGraphHostName, hostnameClient, hostnameServer } =
    configurations[process.env.NODE_ENV];

  const fetchUserId = (token) => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    fetch(`${msGraphHostName}/me`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setUserId(data.id);
      });
  };

  const fetchMemberGroups = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        securityEnabledOnly: false
      })
    };
    fetch(`${msGraphHostName}/users/${userId}/getMemberGroups`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMemberGroups(data.value);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchClientToken = (token, jwt) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        token,
        jwt
      })
    };

    fetch(`${hostnameServer}/clientToken`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setAccessToken(data.access_token);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (accessToken) {
      fetchUserId(accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    if (userId && accessToken) {
      fetchMemberGroups();
    }
  }, [userId, accessToken]);

  useEffect(() => {
    if (memberGroups && hostnameClient) {
      window.location.replace(
        `${hostnameClient}/menuChooser?groups=${memberGroups.toString()}`
      );
    }
  }, [memberGroups, hostnameClient]);

  useEffect(() => {
    const code = new URLSearchParams(search).get("code");
    const jwt = new URLSearchParams(search).get("jwt");
    if (code) {
      fetchClientToken(code, jwt);
    }
  }, []);

  return <p>Logging you in !!!</p>;
}

export default Token;
