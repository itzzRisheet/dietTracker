import React from "react";
import "../Styles/card.css";

function Card({ title, body, imageURL }) {
  return (
    <div className="card-container">
      <div className="image-container">
        <img src={imageURL} alt="img" />
      </div>
      <div className="card-content">
        <div className="title-container">
          <h2>{title}</h2>
        </div>
        <div className="body-container">{body}</div>
      </div>
      <div className="btn">
        <button>
          <a>Read More</a>
        </button>
      </div>
    </div>
  );
}

export default Card;
