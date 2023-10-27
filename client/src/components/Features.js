import React from "react";
import { Link } from "react-router-dom";
import "../Styles/features.css";
import Card from "./card";

function Features() {
  return (
    <div className="main-containerFeature">
      <Card
        title={"Feature"}
        body={
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            doloribus quos amet nesciunt recusandae animi non error repellat,
            atque laboriosam neque tempore, ea labore assumenda distinctio
            aliquid autem placeat veritatis!
          </p>
        }
        imageURL={
          "https://i.pinimg.com/564x/20/df/2c/20df2c36d8e07bd5f816e42160ef08fb.jpg"
        }
      />
      <Card
        title={"Feature"}
        body={
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            doloribus quos amet nesciunt recusandae animi non error repellat,
            atque laboriosam neque tempore, ea labore assumenda distinctio
            aliquid autem placeat veritatis!
          </p>
        }
        imageURL={
          "https://i.pinimg.com/564x/20/df/2c/20df2c36d8e07bd5f816e42160ef08fb.jpg"
        }
      />
      <Card
        title={"Feature"}
        body={
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            doloribus quos amet nesciunt recusandae animi non error repellat,
            atque laboriosam neque tempore, ea labore assumenda distinctio
            aliquid autem placeat veritatis!
          </p>
        }
        imageURL={
          "https://i.pinimg.com/564x/20/df/2c/20df2c36d8e07bd5f816e42160ef08fb.jpg"
        }
      />
      <Card
        title={"Feature"}
        body={
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            doloribus quos amet nesciunt recusandae animi non error repellat,
            atque laboriosam neque tempore, ea labore assumenda distinctio
            aliquid autem placeat veritatis!
          </p>
        }
        imageURL={
          "https://i.pinimg.com/564x/20/df/2c/20df2c36d8e07bd5f816e42160ef08fb.jpg"
        }
      />
    </div>
  );
}

export default Features;
