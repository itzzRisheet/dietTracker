import React from "react";
import { GoogleLogout } from "react-google-login";

function googleLoginButton() {
  const onsuccess = () => {
    console.log("logout successfull");
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLEKEY}
        buttonText="Logout"
        onLogoutSuccess={onsuccess}
      />
    </div>
  );
}

export default googleLoginButton;
