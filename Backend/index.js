import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./mongoConnect.js";
import router from "./routes/route.js";

const app = express();

app.use(express.json());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/");
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//   res.setHeader("Access-Control-Allow-Headers", [
//     "Content-Type",
//     "Authorization",
//   ]);
// });
app.use(
  cors({
    origin: ["http://temp.com", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
    ],
  })
);

app.use(morgan("tiny")); // HTTP request logger middleware for node.js
app.disable("x-powered-by");
app.use("/api", router); // now all routes will goes by prefix '''/api'''

const PORT = 8080 || process.env.PORT;

// HTTP get request
app.get("/", (req, res) => {
  res.status(201).json("hello world");
});

// start server only when we have valid connection
connect()
  .then(() => {
    try {
      // start server
      app.listen(PORT, () => {
        console.log(`app running on http://localhost:${PORT}`);
      });
    } catch (e) {
      console.log(e);
      console.log("can't connect to the server");
    }
  })
  .catch((e) => {
    console.log(e + "occured Invalid database connection");
  });
