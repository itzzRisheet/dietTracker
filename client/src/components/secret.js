import React, { useState } from "react";
import { useAuthStore } from "../store/store";
import toast from "react-hot-toast";
import axios from "axios";
import "../Styles/sec.css";

function Secret() {
  const [name, setName] = useState("");
  const axiosConfig = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
  });
  const deleteUser = async () => {
    await axiosConfig
      .delete(`/api/delUser/:${name}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div>
      <form action="" onSubmit={deleteUser} className="UserForm">
        <input type="text" onChange={handleChange} />
        <div className="btn">
          <button type="submit">Delete</button>
        </div>
      </form>
    </div>
  );
}

export default Secret;
