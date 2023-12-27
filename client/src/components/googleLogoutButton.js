import React from "react";
import { GoogleLogout } from "react-google-login";

const client_id =
  "29826423338-qd1pen2u5bdrj8ft1l7kqvoh6kvmavl3.apps.googleusercontent.com";
const client_secret = "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";

function googleLoginButton() {
  const onsuccess = () => {
    console.log("logout successfull");
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={client_id}
        buttonText="Logout"
        onLogoutSuccess={onsuccess}
      />
    </div>
  );
}

export default googleLoginButton;
