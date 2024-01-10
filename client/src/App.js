import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Password from "./components/Password";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Username from "./components/Username";
import Home from "./components/Home";
import Secret from "./components/secret";

import { AuthorizeUser, ProtectRoute } from "./middleware/auth";
import Features from "./components/Features";
import ContactUs from "./components/contactUs";
import DietUI from "./components/DietUI";
import Layout from "./layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Layout />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/loginPage",
        element: (
          <>
            {" "}
            <Username />
          </>
        ),
      },
      {
        path: "/register",
        element: (
          <>
            {" "}
            <Register />
          </>
        ),
      },
      {
        path: "/Reset",
        element: (
          <>
            {" "}
            <Reset />
          </>
        ),
      },

      {
        path: "/recovery",
        element: (
          <>
            {" "}
            <Recovery />
          </>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthorizeUser>
            {" "}
            <Profile />
          </AuthorizeUser>
        ),
      },
      {
        path: "/password",
        element: (
          <ProtectRoute>
            {" "}
            <Password />
          </ProtectRoute>
        ),
      },
      {
        path: "*",
        element: (
          <>
            {" "}
            <PageNotFound />
          </>
        ),
      },
      {
        path: "/features",
        element: (
          <>
            {" "}
            <Features />
          </>
        ),
      },
      {
        path: "/contact-us",
        element: (
          <>
            {" "}
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

      {
        path: "/secretApp",
        element: (
          <>
            {" "}
            <Secret />
          </>
        ),
      },
    ],
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
