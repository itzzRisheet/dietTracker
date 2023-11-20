import React, { useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import "../Styles/Username.css";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidate } from "../helper/validate";
import { useAuthStore } from "../store/store";
import { resetPassword } from "../helper/helper";
import useFetch from "../hooks/fetch.hooks";

function Reset() {
  const { username } = useAuthStore((state) => state.auth);
  const navigate = useNavigate();

  const [{ isLoading, apiData, status, serverError }] =
    useFetch("createResetSession");

  // useEffect(() => {
  //   console.log(apiData);
  // });

  const formik = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const toastID = toast.loading("Setting up...");
      resetPassword({ username, password: values.password })
        .then(() => {
          toast.remove(toastID);
          toast.success("Reset Successful");
          navigate("/password");
        })
        .catch((err) => {
          console.log(err);
          toast.remove(toastID);
          toast.error(` Couldn't reset password`);
        });
    },
  });

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  if (status && status !== 201) return <Navigate to={"/"} replace={true} />;

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className="glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore more by connecting with us
            </span>
          </div>

          <form
            action=""
            className="py-1 flex flex-col items-center"
            onSubmit={formik.handleSubmit}
          >
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                type="text"
                placeholder="Enter new Password"
                autoComplete="off"
              />
              <input
                {...formik.getFieldProps("repeatPassword")}
                type="text"
                placeholder="Repeat Password"
                autoComplete="off"
              />

              <button className="btn h-20" type="submit">
                reset
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Forgot Password ?
                {/* Using Link rather than anchor tag is good for redirecting to inbuilt page that takes
                almost zero seconds to load */}
                <Link to="/recovery" className="text-red-500">
                  click Here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reset;
