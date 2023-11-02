import React from "react";
import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";

function layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default layout;
