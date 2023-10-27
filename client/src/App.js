import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Password from "./components/Password";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Username from "./components/Username";
import Temp from "./components/temp";
import Home from "./components/Home";

import { AuthorizeUser, ProtectRoute } from "./middleware/auth";
import Navbar from "./components/navbar";
import Features from "./components/Features";
import ContactUs from "./components/contactUs";
import DietUI from "./components/DietUI";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        {" "}
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/loginPage",
    element: (
      <>
        {" "}
        <Navbar />
        <Username />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        {" "}
        <Navbar />
        <Register />
      </>
    ),
  },
  {
    path: "/Reset",
    element: (
      <>
        {" "}
        <Navbar />
        <Reset />
      </>
    ),
  },

  {
    path: "/recovery",
    element: (
      <>
        {" "}
        <Navbar />
        <Recovery />
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <AuthorizeUser>
        {" "}
        <Navbar />
        <Profile />
      </AuthorizeUser>
    ),
  },
  {
    path: "/password",
    element: (
      <ProtectRoute>
        {" "}
        <Navbar />
        <Password />
      </ProtectRoute>
    ),
  },
  {
    path: "*",
    element: (
      <>
        {" "}
        <Navbar />
        <PageNotFound />
      </>
    ),
  },
  {
    path: "/features",
    element: (
      <>
        {" "}
        <Navbar />
        <Features />
      </>
    ),
  },
  {
    path: "/contact-us",
    element: (
      <>
        {" "}
        <Navbar />
        <ContactUs />
      </>
    ),
  },
  {
    path: "/dietUI",
    element: (
      <>
        {" "}
        <DietUI />
      </>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
