import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import avatarImg from "../assests/avatar.png";
import "../Styles/Username.css";
import "../Styles/profile.css";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate";
import convert from "../helper/imageConverter";
import useFetch from "../hooks/fetch.hooks";
import { updateUser } from "../helper/helper";
import { useLocalStorage } from "../store/store";

function Profile() {
  const [File, setFile] = useState();
  const setToken = useLocalStorage((state) => state.setToken);
  const navigate = useNavigate();

  const [{ isLoading, apiData, serverError }] = useFetch();

  const formik = useFormik({
    initialValues: {
      FirstName: apiData?.FirstName || "",
      LastName: apiData?.LastName || "",
      mobile: apiData?.mobile || "",
      email: apiData?.email || "",
      address: apiData?.address || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        profile: File || apiData?.profile || "",
      });

      let updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b> User Updated Successfully...</b>,
        error: <b> Can't update user</b>,
      });

      // updatePromise.then((data) => {
      //   console.log(data);
      // });
    },
  });

  const onUpload = async (e) => {
    const toastID = toast.loading("Uploading...");
    await convert(e.target.files[0])
      .then((binary) => {
        toast.remove(toastID);
        toast.success("Uploaded...");
        setFile(binary);
      })
      .catch((err) => {
        toast.remove(toastID);
        console.log(err);
        toast.error("Couldn't upload the file");
      });
  };

  function userLogout() {
    localStorage.removeItem("token");
    setToken((token) => false);
    navigate("/");
  }

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError) {
    console.log(serverError);
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center ">
        <div className="glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              You can edit your profile
            </span>
          </div>

          <form
            action=""
            className="py-1 flex flex-col flex-wrap items-center"
            onSubmit={formik.handleSubmit}
          >
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <Avatar
                  className="profile_img"
                  alt="Upload Your Profile"
                  src={File || avatarImg || apiData?.profile}
                />
              </label>

              <input type="file" id="profile" onChange={onUpload} />
              {/* <img src="" alt="avatar"></img> */}
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-3">
                <input
                  {...formik.getFieldProps("FirstName")}
                  type="text"
                  placeholder="FirstName"
                  className="textbox"
                  autoComplete="off"
                />
                <input
                  {...formik.getFieldProps("LastName")}
                  type="text"
                  placeholder="LastName"
                  className="textbox"
                  autoComplete="off"
                />
              </div>

              <div className="name flex w-3/4 gap-3">
                <input
                  {...formik.getFieldProps("mobile")}
                  type="text"
                  placeholder="mobile"
                  className="textbox"
                  autoComplete="off"
                />
                <input
                  {...formik.getFieldProps("email")}
                  type="text"
                  placeholder="email"
                  className="textbox"
                  autoComplete="off"
                />
              </div>

              <input
                {...formik.getFieldProps("address")}
                type="text"
                placeholder="address"
                className="textbox"
                autoComplete="off"
              />
              <button className="btn" type="submit">
                update
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                {/* Using Link rather than anchor tag is good for redirecting to inbuilt page that takes
                almost zero seconds to load */}
                <Link onClick={userLogout} to="/" className="text-red-500">
                  logout
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
