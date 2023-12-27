import React from "react";
import { GoogleLogin } from "react-google-login";
import jwtDecode from "jwt-decode";
import { registerUser } from "../helper/helper";

const client_id =
  "29826423338-qd1pen2u5bdrj8ft1l7kqvoh6kvmavl3.apps.googleusercontent.com";

// const clientConfig = {
//   web: {
//     client_id:
//       "255111400733-3bf4b3jnuurqisporthon55b7khs9bkt.apps.googleusercontent.com",
//     project_id: "titanium-cacao-409209",
//     auth_uri: "https://accounts.google.com/o/oauth2/auth",
//     token_uri: "https://oauth2.googleapis.com/token",
//     auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//     client_secret: "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",
//     javascript_origins: ["https://diet-tracker-client.onrender.com"],
//   },
// };

function googleLoginButton() {
  const onsuccess = (response, err) => {
    console.log(response);
    console.log("Login successfull", response.profileObj);
    const { email, givenName, imageUrl } = response.profileObj;
    const username = givenName;
    const profile = imageUrl;
  };

  const onfailure = (response, err) => {
    console.log("Login attempt failed", response);
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={client_id}
        buttonText="Login"
        onSuccess={onsuccess}
        onFailure={onfailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

export default googleLoginButton;
