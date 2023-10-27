import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import avatarImg from "../assests/avatar.png";
import "../Styles/Username.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from "../helper/validate";
import { useAuthStore } from "../store/store.js";

function Username() {
  const setUsername = useAuthStore((state) => state.setUsername);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setUsername(values.username);
      navigate("/password");
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className="glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello</h4>
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
                src={avatarImg}
              />
              {/* <img src="" alt="avatar"></img> */}
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("username")}
                type="text"
                placeholder="Username"
                autoComplete="off"
              />
              <button className="btn" type="submit">
                Let's go
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a Member?
                {/* Using Link rather than anchor tag is good for redirecting to inbuilt page that takes
                almost zero seconds to load */}
                <Link to="/register" className="text-red-500">
                  Register Here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Username;
