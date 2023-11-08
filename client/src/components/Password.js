import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import avatarImg from "../assests/avatar.png";
import "../Styles/Username.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import useFetch from "../hooks/fetch.hooks";
import { useAuthStore } from "../store/store.js";
import { verifyPassword } from "../helper/helper";

function Password() {
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);

  const setEmail = useAuthStore((state) => state.setEmail);
  const setProfile = useAuthStore((state) => state.setProfile);

  useEffect(() => {
    setEmail(apiData?.email);
    setProfile(apiData?.profile);
  }, [apiData]);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginPromise = verifyPassword({
        username: username,
        password: values.password,
      });

      const toastID = toast.loading("verifying...");
      await loginPromise
        .then(() => {
          toast.success("Logged in successfully", { duration: 2000 });
          toast.remove(toastID);
        })
        .catch((err) => {
          toast.remove(toastID);
          console.log(err);
          const msg = err.error;
          toast.error(msg);
        });

      loginPromise.then((res) => {
        let { token } = res.data;
        localStorage.setItem("token", token);
        navigate("/");
        window.location.reload(false);
      });
    },
  });

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className="glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">
              Hello {apiData?.FirstName || apiData?.username}
            </h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore more by connecting with us
            </span>
          </div>

          <form
            action=""
            className="py-1 flex flex-col items-center"
            onSubmit={formik.handleSubmit}
          >
            <div className="profile flex justify-center py-4">
              <Avatar
                className="profile_img"
                alt="Remy Sharp"
                src={apiData?.profile || avatarImg}
              />
              {/* <img src="" alt="avatar"></img> */}
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                type="text"
                placeholder="Enter Password"
                autoComplete="off"
              />
              <button className="btn" type="submit">
                Sign in
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

export default Password;
