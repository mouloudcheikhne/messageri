require("dotenv").config();
// console.log(process.env.PORT);
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const conectDB = require("./configration/dbConfig");
const cookieparser = require("cookie-parser");
const corsOptions = require("./configration/corsConfig");
app.use(cors(corsOptions));
app.use(express.json());
const PORT = process.env.PORT || 5000;
conectDB();
app.get("/", (req, res) => {
  res.send("home page");
  console.log("home page");
});
mongoose.connection.once("open", () => {
  console.log("conection succefull");
  app.listen(PORT, () => {
    console.log("server runong");
  });
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
});
