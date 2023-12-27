// import React from "react";
// import { GoogleLogin } from "react-google-login";

// function googleLoginButton() {
//   const onsuccess = (response, err) => {
//     console.log(response);
//     console.log("Login successfull", response.profileObj);
//     // const { email, givenName, imageUrl } = response.profileObj;
//     // const username = givenName;
//     // const profile = imageUrl;
//   };

//   const onfailure = (response, err) => {
//     console.log("Login attempt failed", response);
//   };

//   return (
//     <div id="signInButton">
//       <GoogleLogin
//         clientId={client_id}
//         buttonText="Login"
//         onSuccess={onsuccess}
//         onFailure={onfailure}
//         cookiePolicy={"single_host_origin"}
//         isSignedIn={true}
//       />
//     </div>
//   );
// }

// export default googleLoginButton;

import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

function googleLoginButton() {
  return (
    <div>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLEKEY}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        ;
      </GoogleOAuthProvider>
    </div>
  );
}

export default googleLoginButton;
