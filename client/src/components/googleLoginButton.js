import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { registerUser } from "../helper/helper";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import generate from "../helper/passwordGenerator";

function GoogleLoginButton() {
  const navigate = useNavigate();

  const onSuccess = async (credentialResponse) => {
    console.log(jwtDecode(credentialResponse.credential));
    const { email, given_name, picture, name } = await jwtDecode(
      credentialResponse.credential
    );
    const toastID = toast.loading("Creating...");

    const values = {
      email,
      name,
      username: given_name,
      password: generate(10),
      profile: picture,
      byGoogle: true,
    };
    await registerUser(values)
      .then(() => {
        toast.success("User registered successfully");
        toast.remove(toastID);
        navigate("/loginPage");
      })
      .catch((err) => {
        toast.remove(toastID);
        console.log(err);
        const msg = err.error.response.data.msg;
        toast.error(msg);
      });
  };

  return (
    <div>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLEKEY}>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={() => {
            console.log("login failed");
          }}
        />
        ;
      </GoogleOAuthProvider>
    </div>
  );
}

export default GoogleLoginButton;
