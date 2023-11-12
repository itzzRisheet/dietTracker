import React, { useEffect, useState, useRef } from "react";
import "../Styles/nav.css";
import { Link } from "react-router-dom";
import { useAuthStore, useLocalStorage } from "../store/store";
import Avatar from "react-avatar";
import avatarImg from "../assests/avatar.png";
import Person2Icon from "@mui/icons-material/Person2";

function CustomLink({ href, children, ...props }) {
  const path = window.location.pathname;
  return (
    <li className={path === href ? "active" : ""}>
      <Link to={href} {...props}>
        {children}
      </Link>
    </li>
  );
}

function Navbar() {
  const [menuOpen, setmenuOpen] = useState(false);
  const { token } = useLocalStorage((state) => state.tokenData);
  const { profile } = useAuthStore((state) => state.auth);
  const [loginStatus, setLoginStatus] = useState(
    localStorage.getItem("token") ? true : false
  );

  useEffect(() => {
    console.log(token);
    setLoginStatus(token);
  }, [token]);

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Dietrack
      </Link>

      <div
        className="menu"
        onClick={() => {
          setmenuOpen(!menuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={menuOpen ? "open" : ""}>
        <CustomLink href={loginStatus ? "/profile" : "/loginPage"}>
          {loginStatus ? (
            <Avatar
              className="profile_img"
              alt="Remy Sharp"
              src={profile || avatarImg}
            />
          ) : (
            "login"
          )}
        </CustomLink>
        <CustomLink href="/features">Features</CustomLink>
        <CustomLink href="/contact-us">Contact us</CustomLink>
      </ul>
    </nav>
  );
}

export default Navbar;
