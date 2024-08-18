import express from "express";
import dotenv from "dotenv";
import dbConnection from "./db/index.js"
import {router} from "./routes/user.route.js";
// const dotenv = require("dotenv"); // Use require for dotenv

const app = express();

dotenv.config({
  path: "./.env",
});

// mongoDB connection
try {
  dbConnection();
  console.log("Mongo DB connected!!");
} catch (error) {
  console.log("Error while conecting DB!",error);
}



app.use(express.urlencoded({ extended: false }));



// app.use((req, res, next) => {
//   fs.appendFile(
//     "logbook.txt",
//     `User created on Date:-> ${Date.now()} and the IP is:-> ${req.ip}, path:-> ${req.path}.`,
//     (err, data) => {
//       next();
//     }
//   );
// });

app.use("/api/users", router);

app.listen(process.env.PORT || 8000, () => {
  console.log(`App is listening on: ${process.env.PORT || 8000} Port`);
});
