import React, { useEffect, useState, useRef } from "react";
import "../Styles/nav.css";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/store";
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
  var { profile } = useAuthStore((state) => state.auth);

  var loginRef = useRef();

  var [loginStatus, setLoginStatue] = useState(false);

  useEffect(() => {
    setLoginStatue(localStorage.getItem("token") ? true : false);
    if (loginStatus) {
      loginRef.current = "logout";
    } else {
      loginRef.current = "login";
    }
  }, [loginStatus, profile]);

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
        <CustomLink
          href={loginStatus ? "/profile" : "/loginPage"}
          ref={loginRef}
        >
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
