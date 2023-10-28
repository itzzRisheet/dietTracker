import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";
import dotenv from "dotenv";
dotenv.config();

async function connect() {
  // to create new mongoDB server instance whenever you start server
  // const mongod = await MongoMemoryServer.create();
  // const getURI = mongod.getUri() // returns MongoDB URL

  mongoose.set("strictQuery", true);
  // const db = await mongoose.connect(getURI);

  await mongoose
    .connect(process.env.MONGO_URI)
    .then((db) => {
      console.log("database Connected...");
      return db;
    })
    .catch((err) => {
      console.log(err);
    });
}

export default connect;
