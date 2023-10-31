import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import avatarImg from "../assests/avatar.png";
import "../Styles/Username.css";
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { RegisterValidate } from "../helper/validate";
import convert from "../helper/imageConverter";
import { registerUser } from "../helper/helper";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [File, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: RegisterValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: File });

      const toastID = toast.loading("Creating...");
      registerUser(values)
        .then(() => {
          toast.remove(toastID);
          toast.success("User registered successfully");
          navigate("/loginPage");
        })
        .catch((err) => {
          toast.remove(toastID);
          // const msg = err.error.response.data.msg;
          // console.log(err);
        });
    },
  });

  const onUpload = async (e) => {
    const binary = await convert(e.target.files[0]);
    setFile(binary);
  };
  return (
    <div className="container mx-auto ">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center ">
        <div className="glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hey, There!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Pleased to have you as a user
            </span>
          </div>

          <form
            action=""
            className="py-1 flex flex-col items-center"
            onSubmit={formik.handleSubmit}
          >
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <Avatar
                  className="profile_img"
                  alt="Upload Your Profile"
                  src={File || avatarImg}
                />
              </label>

              <input type="file" id="profile" onChange={onUpload} />
              {/* <img src="" alt="avatar"></img> */}
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("email")}
                type="text"
                placeholder="Enter Your Email"
                autoComplete="off"
              />
              <input
                {...formik.getFieldProps("username")}
                type="text"
                placeholder="Enter username"
                autoComplete="off"
              />
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
                Already a user ?
                {/* Using Link rather than anchor tag is good for redirecting to inbuilt page that takes
                almost zero seconds to load */}
                <Link to="/loginPage" className="text-red-500">
                  <span> </span>login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
