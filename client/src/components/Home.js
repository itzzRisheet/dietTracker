import React, { useEffect, useState } from "react";
import "../Styles/home.css";
import Card from "./card";
import { Link } from "react-router-dom";

function Home() {
  var [LoginStatus, setLoginStatus] = useState(false);

  LoginStatus = localStorage.getItem("token") ? true : false;

  return (
    <div className="main-containerHome">
      <div className="features">
        <img
          src="https://media.istockphoto.com/id/182810893/photo/fruit-mix.jpg?s=612x612&w=0&k=20&c=v9jopDXbS5LCXY1d8uSwEldLJVVkOpYtYtyHD8azWDU="
          alt=""
        />
        <h2 className="title">
          "Health is a daily practice , not a 30 day diet"
        </h2>
        <p className="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quod
          ipsum explicabo nesciunt doloribus dolor, tempora odit facilis et
          optio distinctio laboriosam beatae corrupti nam eos molestiae soluta
          at aut!
        </p>
        <div className="startBtn">
          <button>
            <Link to="/register">Start your journey</Link>
          </button>
        </div>
      </div>

      <div className="features">
        <h1 className="title"></h1>
        <img src="" alt="" />
        <p className="description"></p>
      </div>

      <div className="features">
        <h1 className="title"></h1>
        <img src="" alt="" />
        <p className="description"></p>
      </div>
    </div>
  );
}

export default Home;
