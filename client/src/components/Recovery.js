import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Avatar from "react-avatar";
// import avatarImg from "../assests/avatar.png";
import "../Styles/Username.css";
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import { useAuthStore } from "../store/store.js";
import { generateOTP, getUser, verifyOTP } from "../helper/helper";
import useFetch from "../hooks/fetch.hooks";

function Recovery() {
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const navigate = useNavigate();
  const { username, email } = useAuthStore((state) => state.auth);

  const [OTP, setOTP] = useState();

  useEffect(() => {
    generateOTP(username).then((otp) => {
      if (otp) {
        return toast.success(
          `Verification mail sent ${email ? "to " + email : ""}`
        );
      }
      return toast.error("Couldn't sent OTP right now!!!");
    });
  }, [username]);

  async function onSubmit(e) {
    try {
      e.preventDefault();
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success("Verified successfully");
        return navigate("/reset");
      }
    } catch (error) {
      return toast.error("Wrong OTP please try again!!!");
    }
  }

  // Resend OTP handler
  function resendOTP() {
    let sendPromise = generateOTP(username);
    toast.promise(sendPromise, {
      loading: "sending",
      success: <b>OTP sent successfully {email ? "to " + email : ""}</b>,
      error: <b>Couldn't send OTP right now!!!</b>,
    });
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className="glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Forgot Password?</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP sent to your Email
            </span>
          </div>

          <form
            action=""
            className="pt-20 flex flex-col items-center"
            onSubmit={onSubmit}
          >
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  {" "}
                  Enter 6 Digits OTP
                </span>
                <input
                  className="pt-4 h-10"
                  type="text"
                  placeholder="Enter OTP"
                  onChange={(e) => setOTP(e.target.value)}
                />
              </div>

              <button className="btn h-10" type="submit">
                Sign in
              </button>
            </div>
          </form>

          <div className="text-center py-4">
            <span className="text-gray-500">
              Didn't get OTP ?
              {/* Using Link rather than anchor tag is good for redirecting to inbuilt page that takes
                almost zero seconds to load */}
              <Link to="/recovery" onClick={resendOTP} className="text-red-500">
                <span> Resend</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recovery;
