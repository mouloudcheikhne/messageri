const mongoose = require("mongoose");
require("dotenv").config();
const conectionDb = async () => {
  try {
    mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.log(err);
  }
};
module.exports = conectionDb;
